#!/usr/bin/env node

/**
 * FlowCode White-Labeling Script
 *
 * This script automates the process of rebranding Void to FlowCode
 * by replacing branding assets, configuration files, and text references.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

class WhiteLabelManager {
	constructor(brandConfigPath) {
		this.brandConfig = JSON.parse(fs.readFileSync(brandConfigPath, "utf8"));
		// Calculate project root: scripts/white-label.js -> scripts/ -> project root
		this.projectRoot = path.dirname(path.dirname(__filename));
	}

	/**
	 * Apply white-labeling changes to the entire codebase
	 */
	async applyWhiteLabel() {
		console.log(
			`🎨 Applying white-labeling for ${this.brandConfig.brandName}...`
		);

		try {
			// 1. Update product.json
			this.updateProductJson();

			// 2. Update package.json
			this.updatePackageJson();

			// 3. Replace branding assets
			this.replaceBrandingAssets();

			// 4. Update text references throughout codebase
			this.updateTextReferences();

			// 5. Update build configurations
			this.updateBuildConfigs();

			console.log("✅ White-labeling applied successfully!");
			console.log(`🚀 ${this.brandConfig.brandName} is ready to build.`);
		} catch (error) {
			console.error("❌ Error applying white-labeling:", error.message);
			process.exit(1);
		}
	}

	/**
	 * Update product.json with new branding
	 */
	updateProductJson() {
		console.log("📝 Updating product.json...");

		const productJsonPath = path.join(this.projectRoot, "product.json");
		const productJson = JSON.parse(fs.readFileSync(productJsonPath, "utf8"));

		// Update all branding fields
		Object.keys(this.brandConfig).forEach((key) => {
			if (productJson.hasOwnProperty(key)) {
				productJson[key] = this.brandConfig[key];
			}
		});

		// Update version info
		productJson.voidVersion = this.brandConfig.version;
		productJson.voidRelease = this.brandConfig.buildNumber;

		fs.writeFileSync(productJsonPath, JSON.stringify(productJson, null, "\t"));
	}

	/**
	 * Update package.json with new branding
	 */
	updatePackageJson() {
		console.log("📦 Updating package.json...");

		const packageJsonPath = path.join(this.projectRoot, "package.json");
		const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

		// Update package name and description
		packageJson.name = this.brandConfig.applicationName;
		packageJson.description = this.brandConfig.description;

		fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
	}

	/**
	 * Replace branding assets (logos, icons, etc.)
	 */
	replaceBrandingAssets() {
		console.log("🖼️  Replacing branding assets...");

		const assetMappings = [
			{
				source: this.brandConfig.logoPath,
				targets: [
					"src/vs/workbench/browser/parts/editor/media/slice_of_void.png",
					"void_icons/slice_of_void.png",
				],
			},
			{
				source: this.brandConfig.iconPath,
				targets: ["src/vs/workbench/browser/media/void-icon-sm.png"],
			},
		];

		assetMappings.forEach((mapping) => {
			if (fs.existsSync(mapping.source)) {
				mapping.targets.forEach((target) => {
					const targetPath = path.join(this.projectRoot, target);
					if (fs.existsSync(targetPath)) {
						fs.copyFileSync(mapping.source, targetPath);
						console.log(`  ✓ Replaced ${target}`);
					}
				});
			} else {
				console.warn(`  ⚠️  Source asset not found: ${mapping.source}`);
			}
		});
	}

	/**
	 * Update text references throughout the codebase
	 */
	updateTextReferences() {
		console.log("📝 Updating text references...");

		const textReplacements = [
			{ from: "Void", to: this.brandConfig.brandName },
			{ from: "void", to: this.brandConfig.applicationName },
			{ from: "voideditor", to: this.brandConfig.applicationName + "editor" },
			{ from: "void-editor", to: this.brandConfig.applicationName + "-editor" },
			{ from: "voideditor.com", to: this.brandConfig.websiteUrl },
			{ from: "voideditor.dev", to: this.brandConfig.websiteUrl },
		];

		// Files to update
		const filesToUpdate = [
			"README.md",
			"src/vs/workbench/contrib/void/browser/void.contribution.ts",
			"src/vs/workbench/contrib/void/common/voidService.ts",
		];

		filesToUpdate.forEach((filePath) => {
			const fullPath = path.join(this.projectRoot, filePath);
			if (fs.existsSync(fullPath)) {
				let content = fs.readFileSync(fullPath, "utf8");

				textReplacements.forEach((replacement) => {
					content = content.replace(
						new RegExp(replacement.from, "g"),
						replacement.to
					);
				});

				fs.writeFileSync(fullPath, content);
				console.log(`  ✓ Updated ${filePath}`);
			}
		});
	}

	/**
	 * Update build configurations
	 */
	updateBuildConfigs() {
		console.log("🔧 Updating build configurations...");

		// Update gulpfile.js if needed
		const gulpfilePath = path.join(this.projectRoot, "gulpfile.js");
		if (fs.existsSync(gulpfilePath)) {
			let content = fs.readFileSync(gulpfilePath, "utf8");
			content = content.replace(/void/gi, this.brandConfig.applicationName);
			fs.writeFileSync(gulpfilePath, content);
			console.log("  ✓ Updated gulpfile.js");
		}
	}

	/**
	 * Create a new brand configuration
	 */
	static createBrandConfig(brandName, outputPath) {
		const template = {
			brandName: brandName,
			brandNameShort: brandName,
			brandNameLong: `${brandName} - AI-Powered Code Editor`,
			applicationName: brandName.toLowerCase().replace(/\s+/g, ""),
			dataFolderName: `.${brandName.toLowerCase().replace(/\s+/g, "")}-editor`,
			win32MutexName: `${brandName.toLowerCase().replace(/\s+/g, "")}editor`,
			win32DirName: brandName,
			win32NameVersion: brandName,
			win32RegValueName: `${brandName}Editor`,
			win32AppUserModelId: `${brandName}.Editor`,
			win32ShellNameShort: `${brandName.charAt(0)}&${brandName.slice(1)}`,
			win32TunnelServiceMutex: `${brandName
				.toLowerCase()
				.replace(/\s+/g, "")}-tunnelservice`,
			win32TunnelMutex: `${brandName.toLowerCase().replace(/\s+/g, "")}-tunnel`,
			darwinBundleIdentifier: `com.${brandName
				.toLowerCase()
				.replace(/\s+/g, "")}.code`,
			linuxIconName: `${brandName.toLowerCase().replace(/\s+/g, "")}-editor`,
			urlProtocol: brandName.toLowerCase().replace(/\s+/g, ""),
			serverApplicationName: `${brandName
				.toLowerCase()
				.replace(/\s+/g, "")}-server`,
			serverDataFolderName: `.${brandName
				.toLowerCase()
				.replace(/\s+/g, "")}-server`,
			tunnelApplicationName: `${brandName
				.toLowerCase()
				.replace(/\s+/g, "")}-tunnel`,
			licenseName: "MIT",
			licenseUrl: `https://github.com/${brandName
				.toLowerCase()
				.replace(/\s+/g, "")}/${brandName
				.toLowerCase()
				.replace(/\s+/g, "")}/blob/main/LICENSE.txt`,
			reportIssueUrl: `https://github.com/${brandName
				.toLowerCase()
				.replace(/\s+/g, "")}/${brandName
				.toLowerCase()
				.replace(/\s+/g, "")}/issues/new`,
			websiteUrl: `https://${brandName.toLowerCase().replace(/\s+/g, "")}.dev`,
			discordUrl: `https://discord.gg/${brandName
				.toLowerCase()
				.replace(/\s+/g, "")}`,
			primaryColor: "#3B82F6",
			secondaryColor: "#1E40AF",
			accentColor: "#60A5FA",
			logoPath: `./branding/assets/${brandName
				.toLowerCase()
				.replace(/\s+/g, "")}-logo.png`,
			iconPath: `./branding/assets/${brandName
				.toLowerCase()
				.replace(/\s+/g, "")}-icon.png`,
			splashImagePath: `./branding/assets/${brandName
				.toLowerCase()
				.replace(/\s+/g, "")}-splash.png`,
			aboutImagePath: `./branding/assets/${brandName
				.toLowerCase()
				.replace(/\s+/g, "")}-about.png`,
			faviconPath: `./branding/assets/${brandName
				.toLowerCase()
				.replace(/\s+/g, "")}-favicon.ico`,
			description: `${brandName} is an AI-powered code editor that brings intelligent coding assistance to your development workflow.`,
			tagline: "Code with AI, Flow with Confidence",
			version: "1.0.0",
			buildNumber: "0001",
			extensionsGallery: {
				serviceUrl: "https://marketplace.visualstudio.com/_apis/public/gallery",
				itemUrl: "https://marketplace.visualstudio.com/items",
			},
			linkProtectionTrustedDomains: [
				`https://${brandName.toLowerCase().replace(/\s+/g, "")}.dev`,
				`https://${brandName.toLowerCase().replace(/\s+/g, "")}.com`,
				`https://github.com/${brandName
					.toLowerCase()
					.replace(/\s+/g, "")}/${brandName.toLowerCase().replace(/\s+/g, "")}`,
				"https://ollama.com",
			],
		};

		fs.writeFileSync(outputPath, JSON.stringify(template, null, 2));
		console.log(`✅ Brand configuration created at ${outputPath}`);
	}
}

// CLI interface
if (require.main === module) {
	const args = process.argv.slice(2);

	if (args.length === 0) {
		console.log(`
🎨 FlowCode White-Labeling Tool

Usage:
  node scripts/white-label.js apply <brand-config.json>  - Apply white-labeling
  node scripts/white-label.js create <brand-name>        - Create new brand config

Examples:
  node scripts/white-label.js apply branding/flowcode-brand.json
  node scripts/white-label.js create "MyBrand"
    `);
		process.exit(1);
	}

	const command = args[0];

	if (command === "apply") {
		const configPath = args[1];
		if (!configPath) {
			console.error("❌ Please provide a brand configuration file path");
			process.exit(1);
		}

		const manager = new WhiteLabelManager(configPath);
		manager.applyWhiteLabel();
	} else if (command === "create") {
		const brandName = args[1];
		if (!brandName) {
			console.error("❌ Please provide a brand name");
			process.exit(1);
		}

		const outputPath = `branding/${brandName
			.toLowerCase()
			.replace(/\s+/g, "")}-brand.json`;
		WhiteLabelManager.createBrandConfig(brandName, outputPath);
	} else {
		console.error(`❌ Unknown command: ${command}`);
		process.exit(1);
	}
}

module.exports = WhiteLabelManager;
