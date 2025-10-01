#!/bin/bash

# FlowCode Deployment Script
set -e

echo "🚀 Starting FlowCode deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Not in FlowCode root directory${NC}"
    exit 1
fi

# Set memory limit
export NODE_OPTIONS="--max-old-space-size=8192"

echo -e "${BLUE}📦 Building web version...${NC}"
npm run build:web

echo -e "${BLUE}🖥️ Building desktop version...${NC}"
npm run build:desktop

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}⚠️ Git not initialized. Initializing...${NC}"
    git init
    git add .
    git commit -m "Initial FlowCode commit - Void fork with white-labeling"
fi

# Check if remote is set
if ! git remote get-url origin > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️ No remote origin set. Please set it with:${NC}"
    echo -e "${YELLOW}   git remote add origin https://github.com/yourusername/flowcode.git${NC}"
    exit 1
fi

# Commit and push changes
echo -e "${BLUE}📤 Pushing to GitHub...${NC}"
git add .
git commit -m "Deploy: $(date)" || echo "No changes to commit"
git push origin main

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${GREEN}🌐 Web version will be deployed to Vercel automatically${NC}"
echo -e "${GREEN}🖥️ Desktop builds will be created via GitHub Actions${NC}"
echo -e "${BLUE}📊 Check deployment status at: https://github.com/$(git remote get-url origin | sed 's/.*github.com[:/]\([^/]*\/[^/]*\)\.git.*/\1/')/actions${NC}"
