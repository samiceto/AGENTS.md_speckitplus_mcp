# MCP Servers Directory

This directory contains Model Context Protocol (MCP) servers that expose SpecKit Plus functionality to AI agents and IDEs.

## Available Servers

### SpecKit Plus MCP Server

**Location**: `speckitplus_mcp/`

**Purpose**: Exposes all SpecKit Plus commands as MCP prompts, enabling any AI agent or IDE to access the complete Spec-Driven Development workflow.

**Features**:
- 13 SpecKit Plus commands available as prompts
- Dynamic command loading from `.claude/commands/`
- Variable substitution support (`$ARGUMENTS`)
- Cross-platform compatibility
- Works with Claude Desktop, Cursor, Windsurf, and other MCP clients

**Quick Start**:
```bash
cd speckitplus_mcp
npm install
npm run build
```

See [speckitplus_mcp/README.md](./speckitplus_mcp/README.md) for detailed documentation.

## What is MCP?

The Model Context Protocol (MCP) is an open standard that enables AI applications to securely access external data sources and tools. It provides:

- **Prompts**: Reusable prompt templates with arguments
- **Resources**: Access to files, databases, and external systems
- **Tools**: Executable functions that agents can call

## Why MCP for SpecKit Plus?

By exposing SpecKit Plus commands through MCP:

1. **Universal Access**: Any MCP-compatible agent/IDE can use SpecKit Plus
2. **Consistency**: Same workflow across different tools
3. **Extensibility**: Easy to add new commands
4. **Integration**: Works alongside other MCP servers

## Using MCP Servers

### Claude Desktop

Add to `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "speckitplus": {
      "command": "node",
      "args": ["/absolute/path/to/speckitplus_mcp/dist/index.js"]
    }
  }
}
```

### Cursor / Windsurf

Add similar configuration through IDE settings → MCP Servers.

### Claude Code CLI

Built-in support via `.claude/commands/` - no additional configuration needed.

## Development

### Adding New MCP Servers

1. Create new directory: `mcp_servers/your_server_name/`
2. Initialize with `package.json` and `tsconfig.json`
3. Implement using `@modelcontextprotocol/sdk`
4. Document in server's README.md
5. Update this file with server information

### Testing MCP Servers

```bash
# Build the server
npm run build

# Test with stdio
node dist/index.js

# Should connect and output status
```

## Resources

- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP SDK](https://github.com/modelcontextprotocol/sdk)
- [SpecKit Plus Documentation](../AGENTS.md)
- [Claude Code Documentation](../CLAUDE.md)

## License

MIT
