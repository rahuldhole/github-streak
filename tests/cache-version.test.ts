import { expect, test, describe, mock, beforeEach, afterEach } from "bun:test";

// Mock Netlify Blobs
const mockGet = mock(async () => null);
const mockSet = mock(async () => {});

mock.module("@netlify/blobs", () => ({
  getStore: () => ({
    get: mockGet,
    setJSON: mockSet
  })
}));

import { app } from "../src/index.ts";

describe("Cache Versioning Logic", () => {
    let originalFetch: any;
    let fetchMock: any;

    beforeEach(() => {
        originalFetch = globalThis.fetch;
        fetchMock = mock(async (url: any, opts: any) => {
            const body = opts?.body ? JSON.parse(opts.body) : {};
            const currentYear = new Date().getFullYear();
            if (body.query && body.query.includes("y" + currentYear)) {
                return {
                    ok: true,
                    json: async () => ({
                        data: {
                            user: {
                                [`y${currentYear}`]: { contributionCalendar: { totalContributions: 100 } }
                            }
                        }
                    })
                } as any;
            }
            return {
                ok: true,
                headers: new Headers({ "X-RateLimit-Remaining": "5000", "X-RateLimit-Reset": "12345678" }),
                json: async () => ({
                    data: {
                        user: {
                            contributionsCollection: {
                                contributionYears: [currentYear],
                                contributionCalendar: {
                                    totalContributions: 100,
                                    weeks: [{ contributionDays: [{ date: `${currentYear}-01-01`, contributionCount: 10 }] }]
                                }
                            }
                        }
                    }
                })
            } as any;
        });
        globalThis.fetch = fetchMock;
    });

    afterEach(() => {
        globalThis.fetch = originalFetch;
    });

    test("Full refresh is triggered when cacheVersion in blob is missing", async () => {
        mockGet.mockImplementation(async (key: string) => {
            if (key.includes(':current')) return { 
                stats: { total: 10, current: {}, max: {} }, 
                timestamp: Date.now(),
                last7: [],
                maxCount: 1
            }; 
            if (key.includes(':history')) return { total: 100, years: [2023] };
            return null;
        });

        await app.request("/?user=tester", {}, { GITHUB_TOKEN: "test" });
        
        // Full refresh makes > 1 fetch call (initial query + chunk query)
        expect(fetchMock.mock.calls.length).toBeGreaterThan(1);
    });

    test("Full refresh is triggered when cacheVersion in blob is older", async () => {
        mockGet.mockImplementation(async (key: string) => {
            if (key.includes(':current')) return { 
                stats: { total: 10, current: {}, max: {} }, 
                timestamp: Date.now(), 
                cacheVersion: 1, // Older version
                last7: [],
                maxCount: 1
            }; 
            if (key.includes(':history')) return { total: 100, years: [2023], cacheVersion: 1 };
            return null;
        });

        await app.request("/?user=tester", {}, { GITHUB_TOKEN: "test" });
        
        // Full refresh makes > 1 fetch call (initial query + chunk query)
        expect(fetchMock.mock.calls.length).toBeGreaterThan(1);
    });

    test("Tiered fetch is used when cacheVersion in blob matches activeVersion but time is stale", async () => {
        // Since package.json has cacheStoreVersion "2", we use 2 here.
        mockGet.mockImplementation(async (key: string) => {
            if (key.includes(':current')) return { 
                stats: { total: 10, current: {}, max: {} }, 
                timestamp: 0, // Force timestamp staleness
                cacheVersion: 4,
                last7: [],
                maxCount: 1
            }; 
            if (key.includes(':history')) return { total: 100, years: [2023], cacheVersion: 4, timestamp: Date.now() };
            return null;
        });

        await app.request("/?user=tester", {}, { GITHUB_TOKEN: "test" });
        
        // Tiered fetch makes ONLY 1 fetch call (Light Mode, no chunk query)
        expect(fetchMock.mock.calls.length).toBe(1);
    });
});

