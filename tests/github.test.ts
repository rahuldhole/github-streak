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
        const targetYear = new Date().getFullYear();
        const prevYear = targetYear - 1;
        globalThis.fetch = mock(async () => {
            return {
                ok: true,
                headers: new Headers({ "X-RateLimit-Remaining": "5000", "X-RateLimit-Reset": "12345678" }),
                json: async () => ({
                    data: {
                        user: {
                            contributionsCollection: {
                                contributionYears: [targetYear, prevYear],
                                contributionCalendar: {
                                    totalContributions: 500, // Rolling 365 days
                                    weeks: [
                                        { 
                                            contributionDays: [
                                                { date: `${prevYear}-12-30`, contributionCount: 5 }, // Should be excluded from current year total
                                                { date: `${targetYear}-01-01`, contributionCount: 10 }, 
                                                { date: `${targetYear}-03-25`, contributionCount: 15 }
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
        
        // Total contributions should only be the ones in current targetYear (10 + 15 = 25)
        // NOT the rolling 500.
        expect(result.totalContributions).toBe(25);
        expect(result.contributionYears).toEqual([targetYear, prevYear]);
        expect(result.days.length).toBe(3); // All days in the calendar weeks are returned, but total is filtered
    });

    test("Non-Light Mode sums all years correctly", async () => {
        const currentYear = new Date().getFullYear();
        const prevYear = currentYear - 1;
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
                                    contributionYears: [currentYear, prevYear],
                                    contributionCalendar: {
                                        totalContributions: 500,
                                        weeks: [{ contributionDays: [{ date: `${currentYear}-01-01`, contributionCount: 10 }] }]
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
                                [`y${currentYear}`]: { contributionCalendar: { totalContributions: 100 } },
                                [`y${prevYear}`]: { contributionCalendar: { totalContributions: 400 } },
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

