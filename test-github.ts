import { fetchGitHubData } from './src/github.ts';

const token = process.env.GITHUB_TOKEN || "test_token_here_if_needed";
// I will need the actual github token if it's required. Let's see if we have one in env.
console.log(process.env.GITHUB_TOKEN ? "Token exists" : "No token");
