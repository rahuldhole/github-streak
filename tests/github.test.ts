import { expect, test, describe, mock, beforeEach, afterEach } from "bun:test";
import { fetchGitHubData } from "../src/github.ts";

describe("fetchGitHubData Logic", () => {
    let originalFetch: any;

    beforeEach(() => {
        originalFetch = globalThis.fetch;
    });

    afterEach(() => {
        globalThis.fetch = originalFetch;
    });

    test("Calculates totalContributions correctly in Light Mode (targetYear)", async () => {
        const targetYear = 2026;
        globalThis.fetch = mock(async () => {
            return {
                ok: true,
                headers: new Headers({ "X-RateLimit-Remaining": "5000", "X-RateLimit-Reset": "12345678" }),
                json: async () => ({
                    data: {
                        user: {
                            contributionsCollection: {
                                contributionYears: [2026, 2025],
                                contributionCalendar: {
                                    totalContributions: 500, // Rolling 365 days
                                    weeks: [
                                        { 
                                            contributionDays: [
                                                { date: "2025-12-30", contributionCount: 5 }, // Should be excluded from 2026 total
                                                { date: "2026-01-01", contributionCount: 10 }, 
                                                { date: "2026-03-25", contributionCount: 15 }
                                            ] 
                                        }
                                    ]
                                }
                            }
                        }
                    }
                })
            } as any;
        });

        const result = await fetchGitHubData("testuser", "testtoken", targetYear);
        
        // Total contributions should only be the ones in 2026 (10 + 15 = 25)
        // NOT the rolling 500.
        expect(result.totalContributions).toBe(25);
        expect(result.contributionYears).toEqual([2026, 2025]);
        expect(result.days.length).toBe(3); // All days in the calendar weeks are returned, but total is filtered
    });

    test("Non-Light Mode sums all years correctly", async () => {
        const currentYear = 2026;
        globalThis.fetch = mock(async (url:any, opts: any) => {
            const body = JSON.parse(opts.body);
            if (!body.query.includes("y" + currentYear)) {
                // Initial years query
                return {
                    ok: true,
                    headers: new Headers({ "X-RateLimit-Remaining": "5000", "X-RateLimit-Reset": "12345678" }),
                    json: async () => ({
                        data: {
                            user: {
                                contributionsCollection: {
                                    contributionYears: [2026, 2025],
                                    contributionCalendar: {
                                        totalContributions: 500,
                                        weeks: [{ contributionDays: [{ date: "2026-01-01", contributionCount: 10 }] }]
                                    }
                                }
                            }
                        }
                    })
                } as any;
            } else {
                // Chunks query
                return {
                    ok: true,
                    json: async () => ({
                        data: {
                            user: {
                                y2026: { contributionCalendar: { totalContributions: 100 } },
                                y2025: { contributionCalendar: { totalContributions: 400 } },
                                __typename: "User" // Test for metadata isolation
                            }
                        }
                    })
                } as any;
            }
        });

        const result = await fetchGitHubData("testuser", "testtoken");
        
        // Should be 100 + 400 = 500
        expect(result.totalContributions).toBe(500);
    });
});
