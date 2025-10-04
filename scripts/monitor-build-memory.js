#!/usr/bin/env node

/**
 * Build Memory Monitor for FlowCode
 * Monitors memory usage during build process and provides optimization suggestions
 */

const os = require('os');
const fs = require('fs');
const path = require('path');

class BuildMemoryMonitor {
	constructor() {
		this.startTime = Date.now();
		this.peakMemory = 0;
		this.monitoring = false;
		this.interval = null;
	}

	start() {
		console.log('🔍 Starting build memory monitoring...');
		this.monitoring = true;
		this.interval = setInterval(() => {
			this.checkMemory();
		}, 5000); // Check every 5 seconds
	}

	stop() {
		if (this.interval) {
			clearInterval(this.interval);
			this.interval = null;
		}
		this.monitoring = false;
		this.report();
	}

	checkMemory() {
		const memUsage = process.memoryUsage();
		const totalMemory = os.totalmem();
		const freeMemory = os.freemem();
		const usedMemory = totalMemory - freeMemory;

		const memoryUsageMB = Math.round(memUsage.heapUsed / 1024 / 1024);
		const totalMemoryMB = Math.round(totalMemory / 1024 / 1024);
		const freeMemoryMB = Math.round(freeMemory / 1024 / 1024);

		if (memoryUsageMB > this.peakMemory) {
			this.peakMemory = memoryUsageMB;
		}

		const memoryPercent = Math.round((usedMemory / totalMemory) * 100);

		if (memoryPercent > 85) {
			console.warn(`⚠️  High memory usage: ${memoryPercent}% (${usedMemoryMB}MB/${totalMemoryMB}MB)`);
			this.suggestOptimizations();
		}

		if (memoryUsageMB > 6000) {
			console.warn(`⚠️  Node.js heap usage: ${memoryUsageMB}MB (approaching limit)`);
		}
	}

	suggestOptimizations() {
		console.log('💡 Memory optimization suggestions:');
		console.log('   - Reduce concurrent build tasks');
		console.log('   - Disable source maps for production');
		console.log('   - Skip non-essential extensions');
		console.log('   - Use transpile-only mode where possible');
	}

	report() {
		const duration = Math.round((Date.now() - this.startTime) / 1000);
		console.log('\n📊 Build Memory Report:');
		console.log(`   Duration: ${duration}s`);
		console.log(`   Peak Memory: ${this.peakMemory}MB`);
		console.log(`   Total System Memory: ${Math.round(os.totalmem() / 1024 / 1024)}MB`);
		console.log(`   Free Memory: ${Math.round(os.freemem() / 1024 / 1024)}MB`);
	}
}

// Usage
if (require.main === module) {
	const monitor = new BuildMemoryMonitor();
	monitor.start();

	// Stop monitoring on process exit
	process.on('exit', () => monitor.stop());
	process.on('SIGINT', () => {
		monitor.stop();
		process.exit(0);
	});
	process.on('SIGTERM', () => {
		monitor.stop();
		process.exit(0);
	});
}

module.exports = BuildMemoryMonitor;
