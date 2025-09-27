# FlowCode Distribution Guide

## Overview
This guide covers how to build, package, and distribute FlowCode for commercial use.

## Build Process

### Prerequisites
- Node.js 20.x or later
- npm or yarn
- Git
- Platform-specific build tools (see below)

### Quick Build
```bash
# Use the provided build script
./build-flowcode.sh

# Or build manually
npm install
npm run buildreact
npm run compile
npm run compile-build
npm run minify-vscode
```

### Development Build
```bash
# Start development mode with daemon
npm run watchd

# Or without daemon
npm run watch

# Build React components in watch mode
npm run watchreact
```

## Platform-Specific Builds

### Windows
```bash
# Install Windows build tools
npm install --global windows-build-tools

# Build for Windows
npm run compile-build
npm run minify-vscode
```

### macOS
```bash
# Install Xcode command line tools
xcode-select --install

# Build for macOS
npm run compile-build
npm run minify-vscode
```

### Linux
```bash
# Install build dependencies
sudo apt-get update
sudo apt-get install build-essential libnss3-dev libatk-bridge2.0-dev libdrm2 libxcomposite1 libxdamage1 libxrandr2 libgbm1 libxss1 libasound2

# Build for Linux
npm run compile-build
npm run minify-vscode
```

## Packaging for Distribution

### Electron App Packaging
```bash
# Install electron-builder
npm install --save-dev electron-builder

# Build distributables
npx electron-builder --publish=never
```

### Platform-Specific Packages

#### Windows (.exe, .msi)
```bash
# Build Windows installer
npx electron-builder --win --publish=never
```

#### macOS (.dmg, .pkg)
```bash
# Build macOS package
npx electron-builder --mac --publish=never
```

#### Linux (.AppImage, .deb, .rpm)
```bash
# Build Linux packages
npx electron-builder --linux --publish=never
```

## Custom Branding

### Logo and Icons
1. Replace icons in `resources/` directory:
   - `resources/darwin/` - macOS icons
   - `resources/win32/` - Windows icons
   - `resources/linux/` - Linux icons

2. Update product information in `product.json`

### Custom Themes
1. Create custom themes in `extensions/theme-*` directories
2. Update theme registry in the codebase
3. Set default theme in product configuration

### Custom Extensions
1. Add built-in extensions to `product.json`
2. Bundle extensions in the build process
3. Configure extension marketplace settings

## Commercial Distribution

### Licensing Integration
1. Add license validation service
2. Implement feature gating based on license
3. Add license management UI
4. Configure license server endpoints

### Feature Flags
```typescript
// Example feature flag implementation
const isFeatureEnabled = (feature: string, license: License) => {
  switch (feature) {
    case 'team-collaboration':
      return license.type === 'enterprise' || license.type === 'professional';
    case 'custom-models':
      return license.type === 'enterprise';
    default:
      return true;
  }
};
```

### Analytics and Telemetry
1. Configure analytics endpoints
2. Implement usage tracking
3. Add privacy controls
4. Configure data retention policies

## Deployment Options

### Self-Hosted
- Docker containers
- Kubernetes deployment
- On-premise installation
- Air-gapped environments

### Cloud Distribution
- AWS Marketplace
- Azure Marketplace
- Google Cloud Marketplace
- Direct cloud deployment

### SaaS Offering
- Multi-tenant architecture
- User management system
- Billing integration
- API rate limiting

## Security Considerations

### Code Signing
```bash
# Windows code signing
signtool sign /f certificate.pfx /p password /t http://timestamp.digicert.com flowcode.exe

# macOS code signing
codesign --sign "Developer ID Application: Your Name" FlowCode.app

# Linux (optional)
gpg --armor --detach-sign flowcode.tar.gz
```

### Security Scanning
```bash
# Run security audit
npm audit

# Check for vulnerabilities
npm audit fix

# Use Snyk for additional scanning
npx snyk test
```

## Testing

### Automated Testing
```bash
# Run all tests
npm run test

# Browser tests
npm run test-browser

# Node tests
npm run test-node

# Integration tests
npm run test-integration
```

### Manual Testing
1. Test on target platforms
2. Verify all features work correctly
3. Test installation and uninstallation
4. Verify license validation
5. Test offline functionality

## Release Process

### Version Management
1. Update version in `package.json`
2. Update version in `product.json`
3. Create git tag
4. Generate changelog
5. Build release packages

### Release Checklist
- [ ] All tests passing
- [ ] Security scan completed
- [ ] Documentation updated
- [ ] Release notes prepared
- [ ] Packages built and signed
- [ ] Distribution channels updated
- [ ] Support team notified

## Distribution Channels

### Direct Distribution
- Company website
- Direct download links
- Email distribution
- Physical media

### App Stores
- Microsoft Store (Windows)
- Mac App Store (macOS)
- Snap Store (Linux)
- Flathub (Linux)

### Enterprise Distribution
- Volume licensing
- Corporate app stores
- IT department deployment
- Managed service providers

## Support and Maintenance

### Update Mechanism
1. Implement auto-update system
2. Configure update servers
3. Add update notifications
4. Handle update failures gracefully

### Support Infrastructure
- Help desk system
- Documentation portal
- Community forums
- Video tutorials

### Monitoring
- Application performance monitoring
- Error tracking and reporting
- Usage analytics
- License compliance monitoring

## Legal Considerations

### Terms of Service
- End-user license agreement
- Privacy policy
- Data processing agreements
- Compliance documentation

### Intellectual Property
- Trademark registration
- Copyright notices
- Open source compliance
- Third-party license management

### Compliance
- GDPR compliance
- CCPA compliance
- SOC2 certification
- Industry-specific regulations

## Contact and Support

For distribution questions and support:
- **Technical Support**: support@flowcode.com
- **Sales**: sales@flowcode.com
- **Legal**: legal@flowcode.com
- **Partnerships**: partnerships@flowcode.com
