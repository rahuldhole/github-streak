import { expect, test, describe, mock } from "bun:test";
import { brotliCompressSync, brotliDecompressSync } from "node:zlib";
import { Buffer } from "node:buffer";

// Mock Netlify Blobs for local testing
const mockGet = mock(async (key?: any, options?: any) => null as any);
const mockSet = mock(async () => {});

mock.module("@netlify/blobs", () => ({
  getStore: () => ({
    get: mockGet,
    setJSON: mockSet
  })
}));

// Mock global fetch
globalThis.fetch = mock(async () => {
  return {
      ok: true,
      headers: new Headers({ "X-RateLimit-Remaining": "5000", "X-RateLimit-Reset": "12345678" }),
      json: async () => ({
          data: {
              user: {
                  contributionsCollection: {
                      contributionYears: [2024],
                      contributionCalendar: {
                          totalContributions: 100,
                          weeks: [{ contributionDays: [] }]
                      }
                  }
              }
          }
      })
  } as any;
}) as any;

import { app } from "../src/index.ts";

const SIMPLE_TEMPLATE = `<svg width="420" height="180" viewBox="0 0 420 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="420" height="180" rx="10" fill="#0d1117"/>
  <text x="20" y="40" fill="#fff" font-size="18">🔥 {{currentStreak}} days</text>
  <text x="20" y="70" fill="#8b949e" font-size="12">{{currentStreakDate}}</text>
  <text x="20" y="100" fill="#fff" font-size="18">🏆 {{personalBest}} best</text>
  <text x="20" y="130" fill="#fff" font-size="18">✨ {{totalContribs}}+ total</text>
  <text x="20" y="170" fill="#8b949e" font-size="9">{{lastUpdated}}</text>
</svg>`;

function compressTemplate(template: string): string {
  return brotliCompressSync(Buffer.from(template)).toString("base64url");
}

describe("Custom Widget V1 — Compress/Decompress API", () => {
  test("POST /api/compress returns base64url encoded brotli", async () => {
    const res = await app.request("/api/compress", {
      method: "POST",
      body: SIMPLE_TEMPLATE
    });
    expect(res.status).toBe(200);
    const json = await res.json() as any;
    expect(json.compressed).toBeDefined();
    expect(typeof json.compressed).toBe("string");
    expect(json.compressed.length).toBeGreaterThan(0);
  });

  test("POST /api/decompress roundtrips back to original", async () => {
    // First compress
    const compressRes = await app.request("/api/compress", {
      method: "POST",
      body: SIMPLE_TEMPLATE
    });
    const { compressed } = await compressRes.json() as any;

    // Then decompress
    const decompressRes = await app.request("/api/decompress", {
      method: "POST",
      body: compressed
    });
    expect(decompressRes.status).toBe(200);
    const { decompressed } = await decompressRes.json() as any;
    expect(decompressed).toBe(SIMPLE_TEMPLATE);
  });

  test("POST /api/compress with empty body returns 400", async () => {
    const res = await app.request("/api/compress", {
      method: "POST",
      body: ""
    });
    expect(res.status).toBe(400);
  });

  test("POST /api/decompress with invalid data returns 500", async () => {
    const res = await app.request("/api/decompress", {
      method: "POST",
      body: "not-valid-base64url-brotli"
    });
    expect(res.status).toBe(500);
  });
});

describe("Custom Widget V1 — Sample SVG Rendering", () => {
  test("GET /v1/sample.svg without custom param returns default SVG", async () => {
    const res = await app.request("/v1/sample.svg");
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toContain("image/svg+xml");
    const body = await res.text();
    expect(body).toContain("<svg");
    // Default SVG should NOT have our custom template text
    expect(body).not.toContain("{{currentStreak}}");
  });

  test("GET /v1/sample.svg?custom=ENCODED renders custom template with sample data", async () => {
    const encoded = compressTemplate(SIMPLE_TEMPLATE);
    const res = await app.request(`/v1/sample.svg?custom=${encoded}`);
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toContain("image/svg+xml");
    const body = await res.text();
    expect(body).toContain("<svg");
    // Variables should be substituted
    expect(body).not.toContain("{{currentStreak}}");
    expect(body).not.toContain("{{personalBest}}");
    expect(body).not.toContain("{{totalContribs}}");
    // Should contain sample stats
    expect(body).toContain("42");  // mock current streak
    expect(body).toContain("99");  // mock personal best
    expect(body).toContain("Sample Data");  // lastUpdated uses "Sample Data"
  });

  test("GET /v1/sample.svg?custom=INVALID returns error SVG", async () => {
    const res = await app.request("/v1/sample.svg?custom=not-valid-brotli");
    expect(res.status).toBe(200);
    const body = await res.text();
    expect(body).toContain("Invalid custom template");
  });
});

describe("Custom Widget V1 — Live User Route", () => {
  test("GET /v1/?user=mock&custom=ENCODED renders custom template with user data", async () => {
    // Set up mock to return cached data
    mockGet.mockImplementation(async (key: string) => {
      if (key.includes(':current')) {
        return {
          stats: {
            current: { count: 15, start: '2024-01-01', end: '2024-01-15' },
            max: { count: 30, start: '2023-06-01', end: '2023-07-01' },
            total: 500
          },
          last7: [
            { contributionCount: 1, date: '2024-01-09' },
            { contributionCount: 3, date: '2024-01-10' },
            { contributionCount: 0, date: '2024-01-11' },
            { contributionCount: 5, date: '2024-01-12' },
            { contributionCount: 2, date: '2024-01-13' },
            { contributionCount: 4, date: '2024-01-14' },
            { contributionCount: 6, date: '2024-01-15' }
          ],
          maxCount: 6,
          timestamp: Date.now(),
          cacheVersion: 4
        };
      }
      if (key.includes(':history')) {
        return { total: 400, years: [2023], cacheVersion: 4, timestamp: Date.now() };
      }
      return null;
    });

    const encoded = compressTemplate(SIMPLE_TEMPLATE);
    const res = await app.request(`/v1/?user=testuser&custom=${encoded}`);
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toContain("image/svg+xml");
    const body = await res.text();
    expect(body).toContain("<svg");
    // Variables should be substituted with real data
    expect(body).not.toContain("{{currentStreak}}");
    expect(body).toContain("15");  // current streak count
    expect(body).toContain("30");  // personal best count
  });

  test("GET /v1/?user=mock without custom param returns default SVG", async () => {
    mockGet.mockImplementation(async (key: string) => {
      if (key.includes(':current')) {
        return {
          stats: {
            current: { count: 15, start: '2024-01-01', end: '2024-01-15' },
            max: { count: 30, start: '2023-06-01', end: '2023-07-01' },
            total: 500
          },
          last7: [
            { contributionCount: 1, date: '2024-01-09' },
            { contributionCount: 3, date: '2024-01-10' },
            { contributionCount: 0, date: '2024-01-11' },
            { contributionCount: 5, date: '2024-01-12' },
            { contributionCount: 2, date: '2024-01-13' },
            { contributionCount: 4, date: '2024-01-14' },
            { contributionCount: 6, date: '2024-01-15' }
          ],
          maxCount: 6,
          timestamp: Date.now(),
          cacheVersion: 4
        };
      }
      if (key.includes(':history')) {
        return { total: 400, years: [2023], cacheVersion: 4, timestamp: Date.now() };
      }
      return null;
    });

    const res = await app.request("/v1/?user=testuser");
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toContain("image/svg+xml");
    const body = await res.text();
    expect(body).toContain("<svg");
    // Should not contain any unreplaced variables
    expect(body).not.toContain("{{");
  });
});

describe("Custom Widget V1 — Brotli Encoding Integrity", () => {
  test("Local brotli roundtrip matches API roundtrip", async () => {
    // Local roundtrip
    const localCompressed = brotliCompressSync(Buffer.from(SIMPLE_TEMPLATE));
    const localEncoded = localCompressed.toString("base64url");
    const localDecoded = brotliDecompressSync(Buffer.from(localEncoded, "base64url")).toString();
    expect(localDecoded).toBe(SIMPLE_TEMPLATE);

    // API roundtrip
    const compressRes = await app.request("/api/compress", { method: "POST", body: SIMPLE_TEMPLATE });
    const { compressed } = await compressRes.json() as any;
    const decompressRes = await app.request("/api/decompress", { method: "POST", body: compressed });
    const { decompressed } = await decompressRes.json() as any;

    // Both should produce the same result
    expect(decompressed).toBe(localDecoded);
  });

  test("Template with all variable types compresses and renders", async () => {
    const fullTemplate = `<svg width="420" height="180" viewBox="0 0 420 180" xmlns="http://www.w3.org/2000/svg">
  <style>:root { --l0: #eee; --l1: #aaa; --l2: #888; --l3: #555; --l4: #222; --text-l0: #000; --text-l1: #000; --text-l2: #fff; --text-l3: #fff; --text-l4: #fff; }</style>
  <text x="10" y="20">{{currentStreak}} | {{personalBest}} | {{totalContribs}}</text>
  <rect fill="var(--l{{day0Level}})" width="20" height="20" x="10" y="30"/>
  <text x="10" y="70">{{day0Count}} {{day0Label}}</text>
  <text x="10" y="90">{{day6Count}} {{day6Label}}</text>
  <text x="10" y="110">{{lastUpdated}}</text>
</svg>`;

    const encoded = compressTemplate(fullTemplate);
    const res = await app.request(`/v1/sample.svg?custom=${encoded}`);
    expect(res.status).toBe(200);
    const body = await res.text();
    // All variables should be substituted
    expect(body).not.toContain("{{currentStreak}}");
    expect(body).not.toContain("{{day0Level}}");
    expect(body).not.toContain("{{day0Count}}");
    expect(body).not.toContain("{{day6Count}}");
    expect(body).not.toContain("{{lastUpdated}}");
    // In a 7-day template, day6Count must be the most recent day (today = 5 in sample data), not 23 days ago
    expect(body).toContain(">5 ");
  });

  test("Supports 30-day variables and activityGraphMonthly template", async () => {
    const { activityGraphMonthly } = await import("../src/templates/activityGraphMonthly.ts");
    const encoded = compressTemplate(activityGraphMonthly);
    const res = await app.request(`/v1/sample.svg?custom=${encoded}`);
    expect(res.status).toBe(200);
    const body = await res.text();
    expect(body).toContain("<svg");
    expect(body).toContain("30-DAY ACTIVITY TREND");
    expect(body).not.toContain("{{day0Count}}");
    expect(body).not.toContain("{{day29Count}}");
    expect(body).not.toContain("{{currentStreak}}");
  });

  test("Supports activityGraph weekly template with CSS boundaries and dynamic maxCount", async () => {
    const { activityGraph } = await import("../src/templates/activityGraph.ts");
    const encoded = compressTemplate(activityGraph);
    const res = await app.request(`/v1/sample.svg?custom=${encoded}`);
    expect(res.status).toBe(200);
    const body = await res.text();
    expect(body).toContain("<svg");
    expect(body).toContain("ACTIVITY GRAPH");
    expect(body).toContain("clamp(");
    expect(body).toContain("style=\"--max: ");
    expect(body).not.toContain("{{maxCount}}");
    expect(body).not.toContain("{{day0Count}}");
    expect(body).not.toContain("{{day6Count}}");
    expect(body).not.toContain("{{currentStreak}}");
  });

  test("Supports activityBars weekly template with CSS boundaries and dynamic maxCount", async () => {
    const { activityBars } = await import("../src/templates/activityBars.ts");
    const encoded = compressTemplate(activityBars);
    const res = await app.request(`/v1/sample.svg?custom=${encoded}`);
    expect(res.status).toBe(200);
    const body = await res.text();
    expect(body).toContain("<svg");
    expect(body).toContain("WEEKLY ACTIVITY BARS");
    expect(body).toContain("clamp(");
    expect(body).toContain("style=\"--max: ");
    expect(body).not.toContain("{{maxCount}}");
    expect(body).not.toContain("{{day0Count}}");
    expect(body).not.toContain("{{day6Count}}");
    expect(body).not.toContain("{{currentStreak}}");
  });

  test("Supports activityGraphMonthly 30-day template with CSS boundaries and dynamic maxCount", async () => {
    const { activityGraphMonthly } = await import("../src/templates/activityGraphMonthly.ts");
    const encoded = compressTemplate(activityGraphMonthly);
    const res = await app.request(`/v1/sample.svg?custom=${encoded}`);
    expect(res.status).toBe(200);
    const body = await res.text();
    expect(body).toContain("<svg");
    expect(body).toContain("30-DAY ACTIVITY TREND");
    expect(body).toContain("clamp(");
    expect(body).toContain("style=\"--max: ");
    expect(body).not.toContain("{{maxCount}}");
    expect(body).not.toContain("{{day0Count}}");
    expect(body).not.toContain("{{day29Count}}");
    expect(body).not.toContain("{{currentStreak}}");
  });

  test("Handles extreme commit values (200+, 1500) and zero commits safely", async () => {
    const { renderCustomTemplate } = await import("../src/components/CustomTemplateRenderer.ts");
    const template = `<svg style="--max: {{maxCount}}; --track-h: 90px;"><style>@keyframes riseUp { to { transform: translateY(clamp(-90px, calc(-1 * var(--val, 0) * (90px / max(var(--max, 1), 1))), 0px)); } }</style><g style="--val: {{day0Count}};"></g></svg>`;

    const highCommitDays = [
      { contributionCount: 1500, date: "2024-03-01" },
      { contributionCount: 200, date: "2024-03-02" },
      { contributionCount: 0, date: "2024-03-03" },
      { contributionCount: 50, date: "2024-03-04" },
      { contributionCount: 10, date: "2024-03-05" },
      { contributionCount: 0, date: "2024-03-06" },
      { contributionCount: 75, date: "2024-03-07" },
    ];
    const dummyStats = {
      current: { count: 3, start: "2024-03-05", end: "2024-03-07" },
      max: { count: 10, start: "2024-02-01", end: "2024-02-10" },
      total: 1835
    };

    const renderedHigh = renderCustomTemplate(template, dummyStats as any, highCommitDays, 1500);
    expect(renderedHigh).toContain("style=\"--max: 1500;");
    expect(renderedHigh).toContain("style=\"--val: 1500;");
    expect(renderedHigh).not.toContain("{{maxCount}}");

    // All-zero scenario: must safely fallback to max 1 to avoid divide-by-zero
    const zeroDays = highCommitDays.map(d => ({ ...d, contributionCount: 0 }));
    const renderedZero = renderCustomTemplate(template, dummyStats as any, zeroDays, 0);
    expect(renderedZero).toContain("style=\"--max: 1;");
    expect(renderedZero).not.toContain("{{maxCount}}");
  });
});


