# SpecKit Plus MCP Server - Quick Reference

## Installation Command
```bash
cd mcp_servers/speckitplus_mcp && npm install && npm run build
```

## Server Path
```
/mnt/d/Quarter-4/spec_kit_plus/mcp-server/mcp_servers/speckitplus_mcp/dist/index.js
```

## MCP Configuration

### Claude Desktop Config
**Location**:
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Linux: `~/.config/Claude/claude_desktop_config.json`

**Add this**:
```json
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
```

## Available Prompts

| Prompt | Usage | Description |
|--------|-------|-------------|
| `specify` | `/prompt speckitplus/specify "feature description"` | Create feature specification |
| `clarify` | `/prompt speckitplus/clarify` | Clarify requirements |
| `plan` | `/prompt speckitplus/plan` | Generate implementation plan |
| `tasks` | `/prompt speckitplus/tasks` | Create task breakdown |
| `implement` | `/prompt speckitplus/implement` | Execute implementation |
| `constitution` | `/prompt speckitplus/constitution` | Define project principles |
| `checklist` | `/prompt speckitplus/checklist "domain"` | Generate validation checklist |
| `adr` | `/prompt speckitplus/adr "decision title"` | Document architecture decision |
| `analyze` | `/prompt speckitplus/analyze` | Check artifact consistency |
| `phr` | `/prompt speckitplus/phr` | Record prompt history |
| `reverse-engineer` | `/prompt speckitplus/reverse-engineer` | Extract specs from code |
| `taskstoissues` | `/prompt speckitplus/taskstoissues` | Convert tasks to GitHub issues |
| `git.commit_pr` | `/prompt speckitplus/git.commit_pr` | Execute git workflows |

## Common Commands

### Test Server
```bash
cd mcp_servers/speckitplus_mcp
node dist/index.js
# Should output: "SpecKit Plus MCP Server running on stdio"
```

### Rebuild Server
```bash
cd mcp_servers/speckitplus_mcp
npm run build
```

### Development Mode
```bash
cd mcp_servers/speckitplus_mcp
npm run watch  # In terminal 1
npm run dev    # In terminal 2
```

## Workflow Example

```bash
# 1. Create specification
/prompt speckitplus/specify "Build user authentication with OAuth2"

# 2. Clarify if needed
/prompt speckitplus/clarify

# 3. Generate plan
/prompt speckitplus/plan

# 4. Break into tasks
/prompt speckitplus/tasks

# 5. Start implementation
/prompt speckitplus/implement
```

## Troubleshooting

### Server not showing up?
- Verify path is absolute (starts with `/` or `C:\`)
- Check Node.js is in PATH: `node --version`
- Restart MCP client after config change

### Commands not loading?
- Check `.claude/commands/` exists: `ls .claude/commands/`
- Should have 13 .md files

### Build errors?
```bash
rm -rf dist/ node_modules/
npm install
npm run build
```

## Files Reference

- `README.md` - Full documentation
- `SETUP_GUIDE.md` - Detailed setup for all platforms
- `src/index.ts` - Server source code
- `dist/index.js` - Compiled server (executable)
- `package.json` - Dependencies and scripts

## Support

For detailed documentation, see:
- [README.md](./README.md)
- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [../README.md](../README.md)
