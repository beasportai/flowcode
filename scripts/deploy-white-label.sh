#!/bin/bash

# White-label deployment script
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

BRAND_NAME=$1
if [ -z "$BRAND_NAME" ]; then
    echo -e "${RED}❌ Usage: ./scripts/deploy-white-label.sh <brand-name>${NC}"
    echo -e "${YELLOW}Example: ./scripts/deploy-white-label.sh mycompany${NC}"
    exit 1
fi

echo -e "${BLUE}🎨 Deploying white-label version: $BRAND_NAME${NC}"

# Check if white-label script exists
if [ ! -f "scripts/white-label.js" ]; then
    echo -e "${RED}❌ White-label script not found. Please ensure scripts/white-label.js exists.${NC}"
    exit 1
fi

# Apply white-labeling
echo -e "${BLUE}🔄 Applying white-labeling...${NC}"
node scripts/white-label.js --brand $BRAND_NAME

# Build with new branding
echo -e "${BLUE}📦 Building with new branding...${NC}"
export NODE_OPTIONS="--max-old-space-size=8192"
npm run build:web

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️ Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
fi

# Deploy to Vercel with custom domain
echo -e "${BLUE}🚀 Deploying to Vercel...${NC}"
vercel --prod --name $BRAND_NAME

echo -e "${GREEN}✅ White-label deployment complete!${NC}"
echo -e "${GREEN}🌐 Your branded version is now live at: https://$BRAND_NAME.vercel.app${NC}"
echo -e "${BLUE}💡 To set up a custom domain, run: vercel domains add $BRAND_NAME.yourdomain.com${NC}"
