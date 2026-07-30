import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

const SERVER_URL = process.env.MCP_URL || "http://localhost:8888/mcp";

async function test() {
  console.log(`\n🔌 Connecting to MCP server at ${SERVER_URL}...\n`);

  const transport = new SSEClientTransport(new URL(SERVER_URL));
  const client = new Client({ name: "test-client", version: "1.0.0" }, { capabilities: {} });

  await client.connect(transport);
  console.log("✅ Connected!\n");

  // --- Test 1: List tools ---
  console.log("📋 Listing tools...");
  const { tools } = await client.listTools();
  console.log(`   Found ${tools.length} tool(s):`);
  for (const tool of tools) {
    console.log(`   - ${tool.name}: ${tool.description?.substring(0, 80)}...`);
  }

  const toolNames = tools.map(t => t.name);
  assert(toolNames.includes("get_template_guide"), "Missing get_template_guide tool");
  assert(toolNames.includes("generate_widget_url"), "Missing generate_widget_url tool");
  assert(!toolNames.includes("save_ai_template"), "save_ai_template should be removed");
  console.log("   ✅ All expected tools present\n");

  // --- Test 2: Call get_template_guide ---
  console.log("📖 Calling get_template_guide...");
  const guideResult = await client.callTool({ name: "get_template_guide", arguments: {} });
  const guideText = (guideResult.content as any[])[0]?.text || "";
  assert(guideText.includes("{{currentStreak}}"), "Guide should mention {{currentStreak}}");
  assert(guideText.includes("{{day0Level}}"), "Guide should mention day level variables");
  assert(guideText.includes("generate_widget_url"), "Guide should reference generate_widget_url tool");
  console.log(`   ✅ Guide returned (${guideText.length} chars)\n`);

  // --- Test 3: Call generate_widget_url without username ---
  console.log("🔗 Calling generate_widget_url (no username)...");
  const noUserResult = await client.callTool({
    name: "generate_widget_url",
    arguments: {
      svgTemplate: '<svg xmlns="http://www.w3.org/2000/svg" width="420" height="180"><text x="10" y="40" fill="#fff">🔥 {{currentStreak}}</text></svg>'
    }
  });
  // Helper: join all text content blocks
  const allText = (result: any) =>
    (result.content as any[])
      .filter((c: any) => c.type === 'text')
      .map((c: any) => c.text)
      .join('\n');

  const noUserText = allText(noUserResult);
  assert(noUserText.includes("sample.svg"), "URL without user should point to sample.svg");
  assert(noUserText.includes("SAMPLE DATA"), "Should warn about sample data");

  // Verify ChatGPT UI meta is present
  const uiBlock = (noUserResult.content as any[]).find((c: any) => c._meta?.ui?.resourceUri);
  assert(!!uiBlock, "Should have a content block with _meta.ui.resourceUri");
  assert(uiBlock._meta.ui.resourceUri === "ui://mcp-app/github-streak-widget", "resourceUri should be ui://mcp-app/github-streak-widget");

  // Verify structuredContent is present
  assert(!!(noUserResult as any).structuredContent, "Should have structuredContent");
  assert((noUserResult as any).structuredContent.previewUrl?.includes("sample.svg"), "structuredContent.previewUrl should contain sample.svg");

  console.log("   ✅ Sample URL generated with warning + ChatGPT UI meta\n");

  // --- Test 4: Call generate_widget_url with username ---
  console.log("🔗 Calling generate_widget_url (with username)...");
  const withUserResult = await client.callTool({
    name: "generate_widget_url",
    arguments: {
      svgTemplate: '<svg xmlns="http://www.w3.org/2000/svg" width="420" height="180"><text x="10" y="40" fill="#fff">🔥 {{currentStreak}}</text></svg>',
      username: "rahuldhole",
      theme: "catppuccin"
    }
  });
  const withUserText = allText(withUserResult);
  assert(withUserText.includes("user=rahuldhole"), "URL should contain the username");
  assert(withUserText.includes("theme=catppuccin"), "URL should contain the theme");
  assert(!withUserText.includes("SAMPLE DATA"), "Should NOT warn about sample data");

  // Verify image content block is present
  const imageBlock = (withUserResult.content as any[]).find((c: any) => c.type === 'image');
  assert(!!imageBlock, "Should have an image content block");
  assert(imageBlock.mimeType === "image/svg+xml", "Image mimeType should be image/svg+xml");

  console.log("   ✅ Live URL generated with username + image preview\n");

  // --- Done ---
  await client.close();
  console.log("🎉 All MCP tests passed!\n");
}

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`❌ Assertion failed: ${message}`);
  }
}

test().catch((err) => {
  console.error(`\n❌ Test failed: ${err.message}\n`);
  process.exit(1);
});
