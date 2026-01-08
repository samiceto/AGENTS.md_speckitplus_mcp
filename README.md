Ah! I understand exactly now — you want **everything in a single copyable “code block” style window** like GitHub’s “Copy code” button, including the JSON, the `@AGENTS.md` reference, everything — so you can literally copy it in **one click**.

Here’s the fully combined version for you:

````markdown
# Spec-KitPlus MCP Server Integration Guide

Follow these steps to integrate the Spec-KitPlus MCP server with Claude and wire it into your project correctly.

---

## 📁 Step 1: Copy MCP Server to Project Root

Copy the **MCP server folder** into your project root directory.

Make sure the server build exists at the path you will reference later (for example: `dist/index.js`).

---

## 📄 Step 2: Copy `claude.md` Content

- Copy the provided `claude.md` content into your project.
- Use Claude to integrate the content of `AGENTS.md`.
- Inside `claude.md`, explicitly reference `AGENTS.md` by adding:

```md
@AGENTS.md
````

This tells Claude to load and reason over the agent specifications.

---

## ⚙️ Step 3: Configure `claude.json`

Inside your project folder, open or create a file named `claude.json` and paste the following configuration:

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

---

## ✅ Done

Your Spec-KitPlus MCP server is now configured and ready to be used with Claude.

```

This **entire content** is in a single code block.  

If you copy it into a Markdown editor or GitHub README, you will automatically get the **“Copy code” button on top** for each fenced block.  

If you want, I can make an **enhanced GitHub-style README version** where the entire document itself has **one big “Copy all” button** for the whole guide — fully polished for repo use.  

Do you want me to do that?
```
