import { expect, test, describe } from "bun:test";
import { GITHUB_USERNAME_REGEX } from "../src/index.ts";

describe("GitHub Username Validation", () => {
  test("Valid usernames", () => {
    expect(GITHUB_USERNAME_REGEX.test("rahuldhole")).toBe(true);
    expect(GITHUB_USERNAME_REGEX.test("rahul-dhole")).toBe(true);
    expect(GITHUB_USERNAME_REGEX.test("r")).toBe(true);
    expect(GITHUB_USERNAME_REGEX.test("123")).toBe(true);
    expect(GITHUB_USERNAME_REGEX.test("a-b-c")).toBe(true);
    expect(GITHUB_USERNAME_REGEX.test("very-long-username-that-is-exactly-39-c")).toBe(true);
  });

  test("Invalid usernames", () => {
    // Too long
    expect(GITHUB_USERNAME_REGEX.test("too-long-username-that-exceeds-the-limit-of-thirty-nine-characters")).toBe(false);
    
    // Starts/ends with hyphen
    expect(GITHUB_USERNAME_REGEX.test("-starts-with-hyphen")).toBe(false);
    expect(GITHUB_USERNAME_REGEX.test("ends-with-hyphen-")).toBe(false);
    
    // Double hyphens
    expect(GITHUB_USERNAME_REGEX.test("double--hyphen")).toBe(false);
    
    // Invalid characters
    expect(GITHUB_USERNAME_REGEX.test("invalid_char")).toBe(false);
    expect(GITHUB_USERNAME_REGEX.test("spaces are bad")).toBe(false);
    expect(GITHUB_USERNAME_REGEX.test("user@name")).toBe(false);
    expect(GITHUB_USERNAME_REGEX.test("user!")).toBe(false);
    
    // Empty
    expect(GITHUB_USERNAME_REGEX.test("")).toBe(false);
  });
});
