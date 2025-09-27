# FlowCode Vercel Deployment Guide

This guide will help you deploy FlowCode to Vercel with automated builds and monitoring.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI**: Install globally with `npm install -g vercel`
3. **Git Repository**: Your FlowCode code should be in a Git repository (GitHub, GitLab, or Bitbucket)

## Quick Deployment

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy to Vercel
```bash
# From your FlowCode directory
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - Project name: flowcode (or your preferred name)
# - Directory: ./
# - Override settings? No
```

### 4. Set Environment Variables
```bash
# Set Node.js memory limit for builds
vercel env add NODE_OPTIONS
# Enter: --max-old-space-size=8192

# Add any API keys you need (optional)
vercel env add OPENAI_API_KEY
vercel env add ANTHROPIC_API_KEY
```

### 5. Monitor Build Progress
```bash
# Start polling build status every minute
npm run poll-build
```

## Automated Deployment

### GitHub Integration (Recommended)

1. **Connect Repository**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Configure build settings:
     - Framework Preset: Other
     - Build Command: `npm run vercel-build`
     - Output Directory: `out`
     - Install Command: `npm install`

2. **Auto-Deploy on Push**:
   - Every push to main branch triggers a new deployment
   - Pull requests get preview deployments
   - Build status is shown in GitHub

### Manual Deployment Commands

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel

# Check deployment status
vercel ls

# View deployment logs
vercel logs [deployment-url]
```

## Build Configuration

The deployment uses these key files:

### `vercel.json`
- Configures build settings
- Sets Node.js memory limit
- Defines output directory

### `package.json` Scripts
- `vercel-build`: Complete build process for Vercel
- `poll-build`: Monitor build status

### Build Process
1. **React Components**: Build UI components
2. **TypeScript Compilation**: Compile all TypeScript code
3. **Production Build**: Optimize for production
4. **Minification**: Create distributable files

## Monitoring Builds

### Real-time Monitoring
```bash
# Poll build status every minute
npm run poll-build

# Or use Vercel CLI
vercel logs --follow
```

### Build Status Indicators
- 🔨 **Building**: Build in progress
- ✅ **Ready**: Build completed successfully
- ❌ **Error**: Build failed
- ⏳ **Queued**: Build waiting to start
- ⏹️ **Canceled**: Build was canceled

### Troubleshooting

#### Build Failures
```bash
# Check build logs
vercel logs [deployment-url]

# Common issues:
# 1. Memory limit exceeded - increase NODE_OPTIONS
# 2. Missing dependencies - check package.json
# 3. TypeScript errors - fix compilation issues
```

#### Performance Issues
```bash
# Increase memory limit
vercel env add NODE_OPTIONS
# Enter: --max-old-space-size=16384

# Optimize build
# - Remove unused dependencies
# - Split large files
# - Use build caching
```

## Environment Variables

### Required
- `NODE_OPTIONS`: `--max-old-space-size=8192`

### Optional (for AI features)
- `OPENAI_API_KEY`: OpenAI API key
- `ANTHROPIC_API_KEY`: Anthropic API key
- `GROQ_API_KEY`: Groq API key
- `MISTRAL_API_KEY`: Mistral API key

### Adding Environment Variables
```bash
# Via CLI
vercel env add VARIABLE_NAME

# Via Dashboard
# Go to Project Settings > Environment Variables
```

## Custom Domains

### Add Custom Domain
```bash
# Add domain
vercel domains add yourdomain.com

# Configure DNS
# Add CNAME record pointing to cname.vercel-dns.com
```

### SSL Certificate
- Automatically provisioned by Vercel
- Supports custom certificates
- Automatic renewal

## Scaling and Performance

### Build Optimization
- **Parallel Builds**: Vercel runs builds in parallel
- **Build Caching**: Dependencies cached between builds
- **Edge Functions**: Deploy functions globally

### Performance Monitoring
```bash
# Check build performance
vercel logs --follow

# Monitor runtime performance
# Use Vercel Analytics dashboard
```

## Rollback and Versioning

### Rollback Deployment
```bash
# List deployments
vercel ls

# Promote previous deployment
vercel promote [deployment-url]
```

### Version Management
- Each deployment gets unique URL
- Production deployments are permanent
- Preview deployments expire after inactivity

## Security

### Environment Variables
- Never commit API keys to repository
- Use Vercel environment variables
- Different values for preview/production

### Access Control
- Team members can be added to projects
- Role-based permissions
- Audit logs available

## Cost and Limits

### Free Tier Limits
- 100GB bandwidth/month
- 100 serverless function executions
- 1 concurrent build

### Pro Tier Benefits
- Unlimited bandwidth
- Unlimited function executions
- 6 concurrent builds
- Priority support

## Support and Resources

### Documentation
- [Vercel Docs](https://vercel.com/docs)
- [FlowCode Docs](https://flowcode.com/docs)

### Community
- [Vercel Discord](https://vercel.com/discord)
- [FlowCode Discord](https://discord.gg/flowcode)

### Support
- Vercel: support@vercel.com
- FlowCode: support@flowcode.com

---

## Quick Commands Reference

```bash
# Deploy
vercel --prod

# Monitor
npm run poll-build

# Logs
vercel logs --follow

# Environment
vercel env add VARIABLE_NAME

# Domains
vercel domains add yourdomain.com

# Rollback
vercel promote [deployment-url]
```

**Happy Deploying! 🚀**
