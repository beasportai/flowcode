# FlowCode Quickstart Guide

## Get Started with FlowCode in 5 Minutes

This guide will help you get FlowCode up and running quickly for development and commercial use.

## Prerequisites

- **Node.js 20.x or later** - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **8GB RAM minimum** (16GB recommended)
- **2GB free disk space**

## Quick Setup

### 1. Clone and Install
```bash
# Clone the repository
git clone https://github.com/flowcode/flowcode.git
cd flowcode

# Install dependencies
npm install
```

### 2. Build FlowCode
```bash
# Use the automated build script
./build-flowcode.sh

# Or build manually
npm run buildreact
npm run compile
```

### 3. Start Development
```bash
# Start development mode with auto-reload
npm run watchd

# Or without daemon
npm run watch
```

## First Run

1. **Launch FlowCode**: The application will start automatically after building
2. **Open the Chat Panel**: Press `Ctrl+L` (or `Cmd+L` on Mac) to open the AI chat
3. **Configure AI Provider**: Go to settings and add your API keys
4. **Start Coding**: Use `Ctrl+K` for quick edits or chat with the AI

## Key Features

### 🤖 AI Chat (Ctrl+L)
- Natural language coding assistance
- Context-aware suggestions
- Multi-model support (OpenAI, Anthropic, Ollama, etc.)

### ⚡ Quick Edit (Ctrl+K)
- Inline code editing with AI
- Real-time suggestions
- Apply changes instantly

### 🔧 Smart Apply
- Fast search/replace for quick changes
- Full file rewrite for complex modifications
- Visual diff preview

### 🎯 Autocomplete
- AI-powered code completion
- Context-aware suggestions
- Real-time streaming

## Configuration

### AI Providers Setup

#### OpenAI
1. Get API key from [OpenAI](https://platform.openai.com/)
2. Add to FlowCode settings
3. Select models (GPT-4, GPT-3.5, etc.)

#### Anthropic
1. Get API key from [Anthropic](https://console.anthropic.com/)
2. Add to FlowCode settings
3. Select models (Claude 3, etc.)

#### Ollama (Local)
1. Install [Ollama](https://ollama.com/)
2. Pull models: `ollama pull llama2`
3. Configure in FlowCode settings

### Custom Settings
- **Model Selection**: Choose different models for different features
- **Context Gathering**: Configure how much code context to include
- **Tool Integration**: Enable/disable built-in tools
- **Custom Prompts**: Add company-specific coding patterns

## Development Workflow

### Daily Development
```bash
# Start development mode
npm run watchd

# Make changes to code
# Changes auto-reload in the application

# Test changes
npm run test
```

### Building for Production
```bash
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

## Commercial Features

### Professional License ($29/month)
- Advanced AI capabilities
- Team collaboration
- Cloud sync
- Email support

### Enterprise License (Custom)
- Custom model training
- SSO integration
- Dedicated support
- On-premise deployment

## Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Clear npm cache
npm cache clean --force
```

#### React Build Issues
```bash
# Rebuild React components
npm run buildreact

# Check for TypeScript errors
npm run compile
```

#### AI Provider Issues
- Verify API keys are correct
- Check network connectivity
- Ensure sufficient API credits
- Try different models

### Getting Help

- **Documentation**: [FlowCode Docs](https://flowcode.com/docs)
- **Discord**: [Join our community](https://discord.gg/flowcode)
- **GitHub Issues**: [Report bugs](https://github.com/flowcode/flowcode/issues)
- **Email Support**: support@flowcode.com

## Next Steps

### For Developers
1. **Explore the Codebase**: Check out `VOID_FLOW_DOCUMENTATION.md`
2. **Customize Features**: Modify settings and prompts
3. **Add Integrations**: Build custom tools and extensions
4. **Contribute**: Submit pull requests and improvements

### For Commercial Use
1. **Purchase License**: Contact sales@flowcode.com
2. **Enterprise Setup**: Get dedicated support and training
3. **Custom Development**: Request custom features
4. **Deployment**: Set up production environments

## Resources

- **Website**: https://flowcode.com
- **Documentation**: https://flowcode.com/docs
- **API Reference**: https://flowcode.com/api
- **Community**: https://discord.gg/flowcode
- **GitHub**: https://github.com/flowcode/flowcode

## Support

- **Technical Support**: support@flowcode.com
- **Sales**: sales@flowcode.com
- **Enterprise**: enterprise@flowcode.com
- **Partnerships**: partnerships@flowcode.com

---

**Welcome to FlowCode!** 🚀

Start building with AI-powered coding assistance today.
