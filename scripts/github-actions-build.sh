#!/bin/bash

# FlowCode GitHub Actions Build Script
# Alternative to Vercel build using GitHub Actions with more memory

set -e

echo "🚀 Building FlowCode with GitHub Actions (High Memory)..."

# Set Node.js memory limit to 16GB (GitHub Actions has more memory)
export NODE_OPTIONS="--max-old-space-size=16384"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build React components
echo "⚛️  Building React components..."
npm run buildreact

# Install build dependencies
echo "📦 Installing build dependencies..."
cd build && npm ci && cd ..

# Install markdown extension dependencies
echo "📦 Installing markdown extension dependencies..."
cd extensions/markdown-language-features && npm ci && cd ../../

# Full compilation with all features
echo "🔨 Compiling full build..."
npm run compile-vercel

# Build with mangling enabled
echo "🏗️  Building for production with mangling..."
npm run compile-build

# Create distributable
echo "📦 Creating distributable..."
npm run minify-vscode

# Create build artifacts
echo "📦 Creating build artifacts..."
tar -czf flowcode-build.tar.gz out-build/

echo "✅ FlowCode GitHub Actions build completed successfully!"
echo "📁 Build artifacts: flowcode-build.tar.gz"
