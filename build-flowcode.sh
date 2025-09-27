#!/bin/bash

# FlowCode Build Script
# This script builds FlowCode for local development and distribution

set -e

echo "🚀 Building FlowCode..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20.x or later."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Node.js version 20.x or later is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
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

echo "✅ FlowCode build completed successfully!"
echo ""
echo "🎉 FlowCode is ready for distribution!"
echo ""
echo "📁 Build artifacts are in the 'out' directory"
echo "🚀 You can now package and distribute FlowCode"
echo ""
echo "💡 To start development mode, run: npm run watchd"
echo "🧪 To run tests, run: npm run test"
