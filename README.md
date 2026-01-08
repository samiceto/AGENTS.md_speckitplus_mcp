Spec-KitPlus MCP Server Integration Guide

Follow these steps to integrate the Spec-KitPlus MCP server with Claude and wire it into your project correctly.

📁 Step 1: Copy MCP Server to Project Root

Copy the MCP server folder into your project root directory.

Make sure the server build exists at the path you will reference later (e.g. dist/index.js).

📄 Step 2: Copy claude.md Content

Copy the provided claude.md content into your project.

Integrate the content of AGENTS.md using Claude.

Inside claude.md, explicitly reference AGENTS.md by adding:

@AGENTS.md


This tells Claude to load and reason over the agent specifications.

⚙️ Step 3: Configure claude.json

Inside your project folder, open or create a file named claude.json and paste the following configuration:

{
  "mcpServers": {
    "speckitplus": {
      "command": "node",
      "args": [
        "/mnt/d/Quarter-4/spec_kit_plus/mcp-server/mcp_servers/speckitplus_mcp/dist/index.js"
      ]
    }
  }
}
