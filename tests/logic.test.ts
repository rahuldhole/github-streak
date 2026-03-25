import { expect, test, describe } from "bun:test";
import { calculateStreakStats } from "../src/logic.ts";

describe("GitHub Streak Logic", () => {
    test("Calculates streak for simple data", () => {
        const days = [
            { date: "2024-03-01", contributionCount: 1 },
            { date: "2024-03-02", contributionCount: 2 },
            { date: "2024-03-03", contributionCount: 0 },
            { date: "2024-03-04", contributionCount: 3 },
            { date: "2024-03-05", contributionCount: 1 }
        ];
        const stats = calculateStreakStats(days as any);
        expect(stats.current.count).toBe(2);
        expect(stats.current.start).toBe("2024-03-04");
        expect(stats.max.count).toBe(2);
    });

    test("Calculates longest streak correctly", () => {
        const days = [
            { date: "2024-01-01", contributionCount: 1 },
            { date: "2024-01-02", contributionCount: 1 },
            { date: "2024-01-03", contributionCount: 1 },
            { date: "2024-01-04", contributionCount: 0 },
            { date: "2024-01-05", contributionCount: 1 },
            { date: "2024-01-06", contributionCount: 1 }
        ];
        const stats = calculateStreakStats(days as any);
        expect(stats.max.count).toBe(3);
        expect(stats.max.start).toBe("2024-01-01");
        expect(stats.current.count).toBe(2);
    });

    test("Handles yesterday fallback (timezone awareness)", () => {
      // If today is index 5 but it's 0, but yesterday (index 4) was > 0, it should preserve the streak
      const days = [
          { date: "2024-01-01", contributionCount: 1 },
          { date: "2024-01-02", contributionCount: 1 },
          { date: "2024-01-03", contributionCount: 1 },
          { date: "2024-01-04", contributionCount: 0 }
      ];
      const stats = calculateStreakStats(days as any);
      expect(stats.current.count).toBe(3); // Preserved because (today is 0, but yesterday was 3)
      expect(stats.current.end).toBe("2024-01-03");
    });

    test("Resets streak if today and yesterday are 0", () => {
      const days = [
          { date: "2024-01-01", contributionCount: 1 },
          { date: "2024-01-02", contributionCount: 1 },
          { date: "2024-01-03", contributionCount: 0 },
          { date: "2024-01-04", contributionCount: 0 }
      ];
      const stats = calculateStreakStats(days as any);
      expect(stats.current.count).toBe(0);
    });
});
