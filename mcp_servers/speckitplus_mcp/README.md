# SpecKit Plus MCP Server

An MCP (Model Context Protocol) server that exposes SpecKit Plus commands as prompts, enabling any AI agent or IDE to access the Spec-Driven Development workflow.

## Overview

This MCP server reads all command files from `.claude/commands/**` and makes them available as prompts through the Model Context Protocol. This allows agents like Claude, Copilot, Gemini, and any MCP-compatible IDE to use SpecKit Plus commands.

## Features

- **13 SpecKit Plus Commands** exposed as MCP prompts:
  - `specify` - Create or update feature specifications
  - `plan` - Execute implementation planning workflow
  - `tasks` - Generate actionable task lists
  - `implement` - Execute implementation in phases
  - `clarify` - Identify underspecified areas in specs
  - `constitution` - Create/update project constitution
  - `checklist` - Generate custom checklists
  - `adr` - Review and create Architecture Decision Records
  - `analyze` - Run cross-artifact consistency analysis
  - `phr` - Record AI exchanges as Prompt History Records
  - `reverse-engineer` - Reverse engineer codebase into SDD artifacts
  - `taskstoissues` - Convert tasks to GitHub issues
  - `git.commit_pr` - Execute git workflows for commits and PRs

- **Automatic Command Loading** - Dynamically loads all commands from `.claude/commands/`
- **Variable Substitution** - Supports `$ARGUMENTS` and custom variables
- **Metadata Preservation** - Preserves command descriptions and handoff information
- **Cross-Platform** - Works with any MCP-compatible client

## Installation

### 1. Install Dependencies

```bash
cd mcp_servers/speckitplus_mcp
npm install
```

### 2. Build the Server

```bash
npm run build
```

### 3. Configure Your MCP Client

Add this server to your MCP client configuration. For Claude Desktop, add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "speckitplus": {
      "command": "node",
      "args": [
        "/absolute/path/to/mcp-server/mcp_servers/speckitplus_mcp/dist/index.js"
      ]
    }
  }
}
```

For other IDEs (Cursor, Windsurf, etc.), add similar configuration to their MCP settings.

## Usage

### In Claude Code CLI

Once configured, you can use prompts like:

```bash
# Use the specify command
/prompt speckitplus/specify "I want to add user authentication"

# Use the plan command
/prompt speckitplus/plan

# Use the tasks command with arguments
/prompt speckitplus/tasks "Generate tasks for the authentication feature"
```

### In Claude Desktop or Other MCP Clients

Access prompts through the MCP prompts interface. Each command appears as a prompt with:
- **Name**: The command slug (e.g., "specify", "plan", "tasks")
- **Description**: From the command's YAML frontmatter
- **Arguments**: Optional arguments field that replaces `$ARGUMENTS` in the command

## How It Works

1. **Command Discovery**: The server reads all `.md` files from `.claude/commands/`
2. **Metadata Parsing**: Extracts YAML frontmatter (description, handoffs)
3. **Prompt Exposure**: Each command becomes an MCP prompt
4. **Variable Substitution**: When invoked, `$ARGUMENTS` is replaced with provided arguments
5. **Content Delivery**: The processed command content is sent to the requesting agent

## Development

### Watch Mode

For development, run in watch mode:

```bash
npm run watch
```

In another terminal, test the server:

```bash
npm run dev
```

### Project Structure

```
mcp_servers/speckitplus_mcp/
├── src/
│   └── index.ts          # Main MCP server implementation
├── dist/                 # Compiled JavaScript (generated)
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## Command Reference

All commands follow the SpecKit Plus Spec-Driven Development workflow:

| Command | Purpose | Stage |
|---------|---------|-------|
| `specify` | Create feature specifications | Specify |
| `clarify` | Clarify underspecified requirements | Specify |
| `plan` | Generate implementation plans | Plan |
| `tasks` | Break down into actionable tasks | Tasks |
| `implement` | Execute implementation | Implement |
| `adr` | Document architectural decisions | Plan |
| `constitution` | Define project principles | Foundation |
| `checklist` | Generate validation checklists | Quality |
| `analyze` | Check artifact consistency | Quality |
| `phr` | Record prompt history | Learning |
| `reverse-engineer` | Extract specs from code | Migration |
| `taskstoissues` | Create GitHub issues | Integration |
| `git.commit_pr` | Automate git workflows | Integration |

## Extending the Server

To add new commands:

1. Create a new `.md` file in `.claude/commands/`
2. Add YAML frontmatter with `description` field
3. Write the command content with `$ARGUMENTS` placeholder
4. Rebuild the server: `npm run build`

The new command will automatically be available as an MCP prompt.

## Troubleshooting

### Server Not Starting

- Check that all dependencies are installed: `npm install`
- Verify the build completed: `npm run build`
- Check the path in your MCP configuration is absolute and correct

### Commands Not Loading

- Verify `.claude/commands/` directory exists
- Check that command files have `.md` extension
- Ensure YAML frontmatter is valid

### Arguments Not Substituting

- Ensure you're passing arguments in the correct format
- Check that `$ARGUMENTS` appears in the command content
- Verify no syntax errors in the command file

## License

MIT

## Contributing

Contributions welcome! Please ensure:
- All commands follow SpecKit Plus patterns
- Documentation is updated
- TypeScript builds without errors
- Changes maintain backward compatibility
