import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

async function test() {
  console.log("Creating client...");
  // Use SSEClientTransport for standard SSE
  const transport = new SSEClientTransport(
    new URL("http://localhost:8888/mcp")
  );
  
  const client = new Client({
    name: "test-client",
    version: "1.0.0"
  }, {
    capabilities: {}
  });

  console.log("Connecting...");
  await client.connect(transport);
  console.log("Connected!");
  
  const tools = await client.listTools();
  console.log("Tools:", tools);
  
  await client.close();
}

test().catch(console.error);
