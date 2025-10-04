#!/bin/bash

# FlowCode Optimized Vercel Build Script
# This script optimizes the build process to avoid OOM errors

set -e

echo "🚀 Building FlowCode for Vercel (Optimized)..."

# Set Node.js memory limit to 6GB (Vercel limit is 8GB)
export NODE_OPTIONS="--max-old-space-size=6144"

# Build React components first (lightest)
echo "⚛️  Building React components..."
npm run buildreact

# Install build dependencies
echo "📦 Installing build dependencies..."
cd build && npm install && cd ..

# Install markdown extension dependencies
echo "📦 Installing markdown extension dependencies..."
cd extensions/markdown-language-features && npm install && cd ../../

# Compile with reduced scope for Vercel
echo "🔨 Compiling for Vercel (reduced scope)..."
npm run compile-vercel

# Build with disabled mangling to reduce memory usage
echo "🏗️  Building for production (no mangling)..."
NODE_OPTIONS="--max-old-space-size=6144" node ./node_modules/gulp/bin/gulp.js compile-build-with-mangling --disableMangle

# Create distributable
echo "📦 Creating distributable..."
npm run minify-vscode

echo "✅ FlowCode optimized build completed successfully!"
echo "📁 Build artifacts are in the 'out-build' directory"
