# FlowCode Build Troubleshooting Guide

## 🚀 **BUILD ISSUES RESOLVED**

The FlowCode project has been successfully configured to resolve the major build issues that were preventing compilation. Here's a comprehensive guide to understanding and resolving build problems.

## ✅ **ISSUES IDENTIFIED AND FIXED**

### 1. **JavaScript Heap Out of Memory Error**
**Problem**: The TypeScript compilation process was running out of memory during the build process.

**Error Message**:
```
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
```

**Solution**: Increased Node.js memory limit to 8GB by updating the build scripts in `package.json`:

```json
{
  "scripts": {
    "compile": "node --max-old-space-size=8192 ./node_modules/gulp/bin/gulp.js compile",
    "gulp": "node --max-old-space-size=8192 ./node_modules/gulp/bin/gulp.js",
    "watch-client": "node --max-old-space-size=8192 ./node_modules/gulp/bin/gulp.js watch-client",
    "watch-extensions": "node --max-old-space-size=8192 ./node_modules/gulp/bin/gulp.js watch-extensions watch-extension-media"
  }
}
```

### 2. **Missing TypeScript Service Files**
**Problem**: Initial investigation suggested missing common service files in the platform directory.

**Investigation Result**: The common service files actually exist in the correct locations:
- `/src/vs/platform/accessibility/common/`
- `/src/vs/platform/extensionManagement/common/`
- `/src/vs/platform/log/common/`
- `/src/vs/platform/telemetry/common/`
- `/src/vs/platform/diagnostics/common/`
- `/src/vs/platform/languagePacks/common/`

**Resolution**: No missing files were found. The issue was the memory limitation preventing successful compilation.

## 🔧 **BUILD COMMANDS**

### Successful Build Commands:
```bash
# Full compilation with increased memory
npm run compile

# Or directly with gulp
node --max-old-space-size=8192 ./node_modules/gulp/bin/gulp.js compile

# Watch mode for development
npm run watch

# Individual components
npm run watch-client
npm run watch-extensions
```

### Memory Requirements:
- **Minimum**: 8GB RAM recommended
- **Node.js Memory**: 8GB heap limit (`--max-old-space-size=8192`)
- **Build Time**: 5-15 minutes depending on system specs

## 📋 **BUILD PROCESS OVERVIEW**

The FlowCode build process follows this sequence:

1. **Clean Phase**: Removes old build artifacts
2. **Extension Compilation**: Compiles all built-in extensions
3. **Core Compilation**: Compiles the main VSCode/Void codebase
4. **Asset Processing**: Processes media and static assets
5. **Output Generation**: Creates the final build in `/out` directory

## 🛠️ **TROUBLESHOOTING COMMON ISSUES**

### Issue 1: Build Hangs or Crashes
**Symptoms**: Build process stops responding or crashes with memory errors

**Solutions**:
1. Ensure sufficient system memory (8GB+ recommended)
2. Close other memory-intensive applications
3. Use the memory-limited build commands
4. Check for background processes consuming memory

### Issue 2: TypeScript Compilation Errors
**Symptoms**: Import errors or missing module errors

**Solutions**:
1. Verify all dependencies are installed: `npm install`
2. Check TypeScript configuration in `src/tsconfig.json`
3. Ensure all platform services exist in their expected locations
4. Clear build cache: `rm -rf out/` and rebuild

### Issue 3: Extension Build Failures
**Symptoms**: Individual extensions fail to compile

**Solutions**:
1. Check extension-specific TypeScript configurations
2. Verify extension dependencies in `extensions/*/package.json`
3. Run individual extension builds for debugging
4. Check for circular dependencies

### Issue 4: Asset Processing Errors
**Symptoms**: Media files or static assets fail to process

**Solutions**:
1. Verify asset file permissions
2. Check for corrupted asset files
3. Ensure proper file paths in build configuration
4. Clear asset cache and rebuild

## 🔍 **DEBUGGING BUILD ISSUES**

### Enable Verbose Logging:
```bash
# Enable debug logging
DEBUG=* npm run compile

# Or with gulp directly
DEBUG=* node --max-old-space-size=8192 ./node_modules/gulp/bin/gulp.js compile
```

### Check Build Status:
```bash
# Monitor build process
ps aux | grep gulp

# Check build output
ls -la out/

# Verify successful compilation
ls -la out/vs/
```

### Memory Monitoring:
```bash
# Monitor memory usage during build
top -pid $(pgrep -f "gulp compile")

# Check Node.js memory usage
node --max-old-space-size=8192 -e "console.log(process.memoryUsage())"
```

## 📊 **BUILD PERFORMANCE OPTIMIZATION**

### System Requirements:
- **RAM**: 8GB minimum, 16GB recommended
- **CPU**: Multi-core processor recommended
- **Storage**: SSD recommended for faster I/O
- **Node.js**: Version 20.x (currently using 20.18.3)

### Optimization Tips:
1. **Close unnecessary applications** during build
2. **Use SSD storage** for faster file operations
3. **Increase Node.js memory** if build fails
4. **Use watch mode** for development to avoid full rebuilds
5. **Parallel builds** are handled automatically by gulp

## 🎯 **SUCCESS INDICATORS**

A successful build should show:
- ✅ All extension compilations complete with "0 errors"
- ✅ Core compilation completes without memory errors
- ✅ Output files generated in `/out` directory
- ✅ No TypeScript compilation errors
- ✅ All assets processed successfully

## 🚨 **EMERGENCY RECOVERY**

If the build system becomes corrupted:

1. **Clean Everything**:
   ```bash
   rm -rf out/
   rm -rf node_modules/
   rm -rf extensions/*/out/
   ```

2. **Reinstall Dependencies**:
   ```bash
   npm install
   ```

3. **Rebuild from Scratch**:
   ```bash
   npm run compile
   ```

## 📞 **SUPPORT**

If you encounter issues not covered in this guide:

1. Check the [Void Editor Issues](https://github.com/voideditor/void/issues)
2. Review the [VSCode Build Documentation](https://github.com/microsoft/vscode/wiki/How-to-Contribute)
3. Check system resources and memory usage
4. Verify Node.js and npm versions

---

**Last Updated**: January 2025  
**FlowCode Version**: 1.99.3  
**Build Status**: ✅ RESOLVED - All major build issues fixed
