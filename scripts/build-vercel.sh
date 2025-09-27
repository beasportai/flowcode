#!/bin/bash

# FlowCode Vercel Build Script
# This script builds FlowCode for Vercel deployment

set -e

echo "🚀 Building FlowCode for Vercel..."

# Set Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=8192"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build React components
echo "⚛️  Building React components..."
npm run buildreact

# Compile TypeScript
echo "🔨 Compiling TypeScript..."
npm run compile

# Build for production
echo "🏗️  Building for production..."
npm run compile-build

# Create distributable
echo "📦 Creating distributable..."
npm run minify-vscode

echo "✅ FlowCode build completed successfully for Vercel!"
echo "📁 Build artifacts are in the 'out' directory"
