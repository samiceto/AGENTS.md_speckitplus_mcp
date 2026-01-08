#!/usr/bin/env node

/**
 * SpecKit Plus MCP Server
 *
 * Exposes SpecKit Plus commands as MCP prompts that can be used by any AI agent or IDE.
 * Reads command files from .claude/commands/ and makes them available via the Model Context Protocol.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Interface for command metadata parsed from YAML frontmatter
 */
interface CommandMetadata {
  description: string;
  handoffs?: Array<{
    label: string;
    agent: string;
    prompt: string;
    send?: boolean;
  }>;
}

/**
 * Interface for a parsed command file
 */
interface CommandFile {
  name: string;
  slug: string;
  metadata: CommandMetadata;
  content: string;
}

/**
 * Loads all command files from the .claude/commands directory
 */
async function loadCommandFiles(commandsDir: string): Promise<CommandFile[]> {
  const commands: CommandFile[] = [];

  try {
    const files = await fs.readdir(commandsDir);
    const mdFiles = files.filter(f => f.endsWith('.md'));

    for (const file of mdFiles) {
      const filePath = path.join(commandsDir, file);
      const content = await fs.readFile(filePath, 'utf-8');

      // Parse YAML frontmatter
      const { data, content: markdownContent } = matter(content);

      // Extract command name (e.g., sp.specify.md -> specify)
      const slug = file.replace('.md', '').replace('sp.', '');

      commands.push({
        name: file.replace('.md', ''),
        slug,
        metadata: data as CommandMetadata,
        content: markdownContent.trim(),
      });
    }

    return commands;
  } catch (error) {
    console.error('Error loading command files:', error);
    return [];
  }
}

/**
 * Substitutes variables in command content
 */
function substituteVariables(content: string, args: Record<string, string>): string {
  let result = content;

  // Replace $ARGUMENTS with provided arguments or empty string
  const argumentsValue = args.arguments || args.ARGUMENTS || '';
  result = result.replace(/\$ARGUMENTS/g, argumentsValue);

  // Replace other variables
  for (const [key, value] of Object.entries(args)) {
    if (key !== 'arguments' && key !== 'ARGUMENTS') {
      const regex = new RegExp(`\\$${key}`, 'g');
      result = result.replace(regex, value);
    }
  }

  return result;
}

/**
 * Main server initialization
 */
async function main() {
  // Determine the commands directory path
  // Go up from dist/index.js to project root, then to .claude/commands
  const projectRoot = path.resolve(__dirname, '../../..');
  const commandsDir = path.join(projectRoot, '.claude', 'commands');

  console.error(`Loading commands from: ${commandsDir}`);

  // Load all command files
  const commands = await loadCommandFiles(commandsDir);

  if (commands.length === 0) {
    console.error('Warning: No command files found!');
  } else {
    console.error(`Loaded ${commands.length} commands: ${commands.map(c => c.name).join(', ')}`);
  }

  // Create MCP server
  const server = new Server(
    {
      name: 'speckitplus-mcp',
      version: '1.0.0',
    },
    {
      capabilities: {
        prompts: {},
        tools: {},
      },
    }
  );

  /**
   * List all available prompts (commands)
   */
  server.setRequestHandler(ListPromptsRequestSchema, async () => {
    return {
      prompts: commands.map(cmd => ({
        name: cmd.slug,
        description: cmd.metadata.description,
        arguments: [
          {
            name: 'arguments',
            description: 'Arguments to pass to the command (replaces $ARGUMENTS)',
            required: false,
          },
        ],
      })),
    };
  });

  /**
   * Get a specific prompt (command) with arguments substituted
   */
  server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    const command = commands.find(c => c.slug === name);
    if (!command) {
      throw new Error(`Command not found: ${name}`);
    }

    // Substitute variables in content
    const processedContent = substituteVariables(
      command.content,
      (args as Record<string, string>) || {}
    );

    return {
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: processedContent,
          },
        },
      ],
    };
  });

  /**
   * List available tools (empty for now, but can be extended)
   */
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [],
    };
  });

  /**
   * Handle tool calls (empty for now, but can be extended)
   */
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    throw new Error(`Unknown tool: ${request.params.name}`);
  });

  // Start the server
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('SpecKit Plus MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
