# Welcome to FlowCode

<div align="center">
	<img
		src="./src/vs/workbench/browser/parts/editor/media/slice_of_void.png"
	 	alt="FlowCode Welcome"
		width="300"
	 	height="300"
	/>
</div>

FlowCode is the AI-powered code editor that makes development flow naturally.

Use AI agents on your codebase, checkpoint and visualize changes, and bring any model or host locally. FlowCode sends messages directly to providers without retaining your data.

This repo contains the full sourcecode for FlowCode. If you're new, welcome!

- 🧭 [Website](https://flowcode.com)

- 👋 [Discord](https://discord.gg/flowcode)

- 🚙 [Project Board](https://github.com/orgs/flowcode/projects/2)

## Features

- **AI Chat Interface**: Natural language coding assistance with Ctrl+L
- **Quick Edit**: Inline code editing with AI suggestions using Ctrl+K
- **Smart Apply**: Fast search/replace or full file rewrite
- **Autocomplete**: Real-time AI-powered code completion
- **Multi-Model Support**: OpenAI, Anthropic, Ollama, and more
- **Local Hosting**: Run models locally with Ollama
- **Tools Integration**: Built-in and MCP (Model Context Protocol) tools
- **Thread Management**: Persistent chat history and checkpoints

## Contributing

1. To get started working on FlowCode, check out our Project Board! You can also see [HOW_TO_CONTRIBUTE](https://github.com/flowcode/flowcode/blob/main/HOW_TO_CONTRIBUTE.md).

2. Feel free to attend a casual weekly meeting in our Discord channel!

## Building FlowCode

### Prerequisites

- Node.js 20.x
- npm or yarn
- Git

### Development Setup

```bash
# Clone the repository
git clone https://github.com/flowcode/flowcode.git
cd flowcode

# Install dependencies
npm install

# Start development mode
npm run watchd

# Or run without daemon
npm run watch
```

### Production Build

```bash
# Compile for production
npm run compile

# Build optimized version
npm run compile-build

# Create distributable
npm run minify-vscode
```

### Testing

```bash
# Run all tests
npm run test

# Browser tests
npm run test-browser

# Node tests
npm run test-node
```

## Reference

FlowCode is built on the [VSCode](https://github.com/microsoft/vscode) codebase. For a guide to the codebase, see [FLOWCODE_CODEBASE_GUIDE](https://github.com/flowcode/flowcode/blob/main/FLOWCODE_CODEBASE_GUIDE.md).

## Commercial Use

FlowCode is available for commercial use and distribution. Contact us for enterprise licensing and custom features.

## Support

You can always reach us in our Discord server or contact us via email: hello@flowcode.com.
