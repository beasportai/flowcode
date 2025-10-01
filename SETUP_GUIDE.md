# FlowCode Setup Guide

## 🚀 Quick Start

This guide will help you get FlowCode up and running from the Void fork.

### Prerequisites

- **Node.js**: Version 20.18.2 (use `nvm install` and `nvm use` if you have nvm)
- **Python**: Required for native module compilation
- **Git**: For version control
- **Platform-specific tools**:
  - **macOS**: Xcode Command Line Tools
  - **Windows**: Visual Studio 2022 or VS Build Tools
  - **Linux**: Build essentials and development libraries

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/flowcode/flowcode.git
cd flowcode

# Install dependencies
npm install

# Build React components
npm run buildreact
```

### 2. Apply FlowCode Branding

```bash
# Apply FlowCode branding
node scripts/white-label.js apply branding/flowcode-brand.json
```

### 3. Start Development

```bash
# Start the development build
npm run watch

# In another terminal, launch the application
./scripts/code.sh --user-data-dir ./.tmp/user-data --extensions-dir ./.tmp/extensions
```

## 🎨 White-Labeling

### Create a New Brand

```bash
# Create a new brand configuration
node scripts/white-label.js create "MyBrand"

# Apply the branding
node scripts/white-label.js apply branding/mybrand-brand.json
```

### Brand Configuration

Edit `branding/your-brand.json` to customize:

```json
{
  "brandName": "Your Brand",
  "applicationName": "yourbrand",
  "primaryColor": "#FF6B6B",
  "logoPath": "./branding/assets/your-logo.png",
  "websiteUrl": "https://yourbrand.dev"
}
```

## 🔧 Build for Production

### Development Build
```bash
npm run watch
```

### Production Build
```bash
# macOS Apple Silicon
npm run gulp vscode-darwin-arm64

# macOS Intel
npm run gulp vscode-darwin-x64

# Windows x64
npm run gulp vscode-win32-x64

# Linux x64
npm run gulp vscode-linux-x64
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Build Errors
```bash
# Clean and rebuild
rm -rf node_modules
npm install
npm run buildreact
```

#### 2. React Build Issues
```bash
# Rebuild React components
npm run buildreact
```

#### 3. Permission Issues (macOS)
```bash
# Fix sandbox permissions
sudo chown root:root .build/electron/chrome-sandbox
sudo chmod 4755 .build/electron/chrome-sandbox
```

#### 4. Node Version Issues
```bash
# Use correct Node version
nvm install
nvm use
```

#### 5. Path Issues
- Ensure your project path doesn't contain spaces
- Use absolute paths when possible

### Build Process

The build process consists of several steps:

1. **Dependencies**: `npm install` installs all required packages
2. **React Build**: `npm run buildreact` builds React components
3. **Watch Mode**: `npm run watch` starts continuous compilation
4. **Launch**: `./scripts/code.sh` launches the development version

### File Structure

```
flowcode/
├── branding/                 # White-labeling assets and configs
│   ├── assets/              # Brand assets (logos, icons)
│   └── flowcode-brand.json  # FlowCode brand configuration
├── scripts/                 # Build and utility scripts
│   └── white-label.js       # White-labeling automation
├── src/vs/workbench/contrib/void/  # Void-specific code
│   ├── browser/             # Browser-side code
│   ├── common/              # Shared code
│   └── electron-main/       # Main process code
├── out/                     # Compiled output
└── product.json             # Product configuration
```

## 📋 Development Workflow

### 1. Making Changes
1. Edit source files in `src/vs/workbench/contrib/void/`
2. Changes are automatically compiled in watch mode
3. Reload the application window (Cmd+R / Ctrl+R)

### 2. Adding New Features
1. Create new files in appropriate directories
2. Update `void.contribution.ts` to register services
3. Add UI components to React build if needed

### 3. Testing
1. Use development mode for testing
2. Test with different user data directories
3. Verify white-labeling works correctly

## 🎯 Next Steps

### Phase 1: Core Functionality ✅
- [x] Fork and setup Void
- [x] Implement white-labeling system
- [x] Create build automation

### Phase 2: Business Features (In Progress)
- [ ] License validation system
- [ ] Payment integration (Stripe/Paddle)
- [ ] Subscription management
- [ ] Usage tracking

### Phase 3: Enterprise Features
- [ ] SSO integration
- [ ] Role-based access control
- [ ] Audit logging
- [ ] Private marketplace

### Phase 4: Integrations
- [ ] API gateway
- [ ] Webhook system
- [ ] CI/CD integrations
- [ ] Cloud service integrations

## 📞 Support

- **Documentation**: [docs.flowcode.dev](https://docs.flowcode.dev)
- **Issues**: [GitHub Issues](https://github.com/flowcode/flowcode/issues)
- **Community**: [Discord](https://discord.gg/flowcode)

## 📄 License

FlowCode is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

*This guide is updated regularly. Last updated: September 30, 2024*
