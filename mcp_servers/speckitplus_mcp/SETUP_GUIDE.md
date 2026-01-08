# SpecKit Plus MCP Server - Setup Guide

Complete guide to setting up and using the SpecKit Plus MCP Server with various AI agents and IDEs.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Usage Examples](#usage-examples)
5. [IDE Integration](#ide-integration)
6. [Troubleshooting](#troubleshooting)

---

## Quick Start

```bash
# 1. Navigate to the MCP server directory
cd mcp_servers/speckitplus_mcp

# 2. Install dependencies
npm install

# 3. Build the server (automatically runs after install)
npm run build

# 4. Test the server
npm run dev
```

---

## Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### Step-by-Step Installation

1. **Install Dependencies**

   ```bash
   cd mcp_servers/speckitplus_mcp
   npm install
   ```

   This will:
   - Install MCP SDK and dependencies
   - Automatically build the TypeScript code
   - Generate compiled files in `dist/`

2. **Verify Build**

   ```bash
   ls dist/
   # Should show: index.js, index.d.ts, and .map files
   ```

3. **Get Absolute Path**

   ```bash
   # Linux/Mac
   realpath dist/index.js

   # Windows (PowerShell)
   Resolve-Path dist\index.js

   # Or manually construct:
   # /your/full/path/to/mcp-server/mcp_servers/speckitplus_mcp/dist/index.js
   ```

---

## Configuration

### Claude Desktop

1. **Locate Configuration File**

   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

2. **Add Server Configuration**

   ```json
   {
     "mcpServers": {
       "speckitplus": {
         "command": "node",
         "args": [
           "/ABSOLUTE/PATH/TO/mcp-server/mcp_servers/speckitplus_mcp/dist/index.js"
         ]
       }
     }
   }
   ```

3. **Replace Path**

   Replace `/ABSOLUTE/PATH/TO/` with your actual path from step 3 of installation.

4. **Restart Claude Desktop**

### Cursor IDE

1. **Open Cursor Settings** → **MCP Servers**

2. **Add New Server**

   ```json
   {
     "speckitplus": {
       "command": "node",
       "args": [
         "/ABSOLUTE/PATH/TO/mcp-server/mcp_servers/speckitplus_mcp/dist/index.js"
       ]
     }
   }
   ```

3. **Restart Cursor**

### Windsurf IDE

1. **Open Windsurf Settings** → **Extensions** → **MCP**

2. **Add Server Configuration** (similar to Cursor)

3. **Restart Windsurf**

### Claude Code CLI

The SpecKit Plus commands are already integrated into Claude Code via the `.claude/commands/` directory. No additional MCP configuration needed for CLI usage.

However, you can still use the MCP server for programmatic access:

```bash
# Start the MCP server
node mcp_servers/speckitplus_mcp/dist/index.js
```

---

## Usage Examples

### Example 1: Create a Feature Specification

**Using Claude Desktop:**

1. Open prompts panel
2. Select **speckitplus/specify**
3. Enter arguments: `"Add user authentication with OAuth2"`
4. Submit

**Using Claude Code CLI:**

```bash
# Via slash command (uses built-in command)
/sp.specify Add user authentication with OAuth2

# Via MCP prompt (if configured)
/prompt speckitplus/specify "Add user authentication with OAuth2"
```

### Example 2: Generate Implementation Plan

**Using any MCP client:**

1. Ensure you're on a feature branch
2. Use prompt: **speckitplus/plan**
3. No arguments needed (reads from current branch)

### Example 3: Create Task List

**Using any MCP client:**

1. Select prompt: **speckitplus/tasks**
2. Optional arguments: `"Focus on MVP features"`
3. Review generated tasks

### Example 4: Full Workflow

```bash
# 1. Create specification
/prompt speckitplus/specify "Build a REST API for user management"

# 2. Clarify requirements (if needed)
/prompt speckitplus/clarify

# 3. Generate implementation plan
/prompt speckitplus/plan

# 4. Break down into tasks
/prompt speckitplus/tasks

# 5. Start implementation
/prompt speckitplus/implement
```

---

## IDE Integration

### Available Prompts

Once configured, these prompts are available in all MCP-compatible clients:

| Prompt Name | Description | Arguments |
|-------------|-------------|-----------|
| `specify` | Create or update feature specification | Feature description |
| `clarify` | Clarify underspecified requirements | (optional) |
| `plan` | Execute implementation planning | (optional) Tech preferences |
| `tasks` | Generate actionable task list | (optional) Focus area |
| `implement` | Execute implementation in phases | (optional) Phase number |
| `adr` | Review and create ADRs | Decision title |
| `constitution` | Create/update project principles | (optional) Principles |
| `checklist` | Generate custom checklist | Domain/context |
| `analyze` | Run consistency analysis | (optional) |
| `phr` | Record prompt history | Title and stage |
| `reverse-engineer` | Extract specs from code | (optional) Target path |
| `taskstoissues` | Convert tasks to GitHub issues | (optional) |
| `git.commit_pr` | Execute git workflows | (optional) |

### Accessing Prompts

**Claude Desktop:**
- Click book icon in top-right
- Browse available prompts
- Select prompt and fill arguments

**Cursor/Windsurf:**
- Use command palette
- Search for "MCP Prompts"
- Select desired prompt

**Programmatic Access:**
```typescript
// Example using MCP SDK
const response = await client.getPrompt({
  name: 'specify',
  arguments: {
    arguments: 'Add user authentication'
  }
});
```

---

## Troubleshooting

### Server Not Appearing in MCP Clients

**Possible Causes:**
1. Path in configuration is not absolute
2. Node.js is not in PATH
3. Server not built (missing `dist/` folder)

**Solutions:**
```bash
# 1. Verify build
npm run build

# 2. Test server directly
node dist/index.js
# Should output: "SpecKit Plus MCP Server running on stdio"

# 3. Check configuration path is absolute
# ❌ Wrong: "./mcp_servers/speckitplus_mcp/dist/index.js"
# ✅ Correct: "/home/user/projects/mcp-server/mcp_servers/speckitplus_mcp/dist/index.js"
```

### Commands Not Loading

**Check:**
```bash
# Verify .claude/commands/ directory exists
ls ../../.claude/commands/

# Should list 13 .md files:
# sp.adr.md, sp.analyze.md, sp.checklist.md, sp.clarify.md,
# sp.constitution.md, sp.git.commit_pr.md, sp.implement.md,
# sp.phr.md, sp.plan.md, sp.reverse-engineer.md, sp.specify.md,
# sp.tasks.md, sp.taskstoissues.md
```

### $ARGUMENTS Not Substituting

**Ensure:**
- You're passing arguments in the correct format
- The prompt accepts an `arguments` parameter
- No syntax errors in command files

**Test:**
```bash
# This should work
/prompt speckitplus/specify "Test feature"

# Not this
/prompt speckitplus/specify Test feature
```

### TypeScript Build Errors

```bash
# Clean and rebuild
rm -rf dist/ node_modules/
npm install
npm run build
```

### Permission Errors (macOS/Linux)

```bash
# Make executable
chmod +x dist/index.js
```

---

## Advanced Configuration

### Environment Variables

You can add environment variables to the MCP configuration:

```json
{
  "mcpServers": {
    "speckitplus": {
      "command": "node",
      "args": ["/path/to/dist/index.js"],
      "env": {
        "DEBUG": "true",
        "CUSTOM_VAR": "value"
      }
    }
  }
}
```

### Development Mode

For active development:

```bash
# Terminal 1: Watch and rebuild on changes
npm run watch

# Terminal 2: Test server (restart after changes)
npm run dev
```

### Custom Command Directory

By default, commands are loaded from `.claude/commands/`. To change this, modify `src/index.ts`:

```typescript
const commandsDir = path.join(projectRoot, 'your', 'custom', 'path');
```

Then rebuild:
```bash
npm run build
```

---

## Next Steps

1. **Test the Server**: Try each prompt with sample arguments
2. **Read AGENTS.md**: Understand the Spec-Driven Development workflow
3. **Create Your First Feature**: Use `/prompt speckitplus/specify`
4. **Join the Community**: Share your experience and get help

For more information, see the [main README](./README.md).
