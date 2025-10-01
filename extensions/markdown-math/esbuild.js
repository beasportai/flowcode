/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
//@ts-check

const path = require('path');
const fse = require('fs-extra');

const args = process.argv.slice(2);

const srcDir = path.join(__dirname, 'notebook');
const outDir = path.join(__dirname, 'notebook-out');

function postBuild(outDir) {
	// Try extension's node_modules first, then fall back to main project's node_modules
	const extensionNodeModules = path.join(__dirname, 'node_modules');
	const mainNodeModules = path.join(__dirname, '../../../../node_modules');

	let katexPath;
	if (fse.existsSync(path.join(extensionNodeModules, 'katex'))) {
		katexPath = extensionNodeModules;
	} else if (fse.existsSync(path.join(mainNodeModules, 'katex'))) {
		katexPath = mainNodeModules;
	} else {
		console.warn('Katex not found in either extension or main node_modules');
		return;
	}

	fse.copySync(
		path.join(katexPath, 'katex', 'dist', 'katex.min.css'),
		path.join(outDir, 'katex.min.css'));

	const fontsDir = path.join(katexPath, 'katex', 'dist', 'fonts');
	const fontsOutDir = path.join(outDir, 'fonts/');

	if (fse.existsSync(fontsDir)) {
		fse.mkdirSync(fontsOutDir, { recursive: true });

		for (const file of fse.readdirSync(fontsDir)) {
			if (file.endsWith('.woff2')) {
				fse.copyFileSync(path.join(fontsDir, file), path.join(fontsOutDir, file));
			}
		}
	}
}

require('../esbuild-webview-common').run({
	entryPoints: [
		path.join(srcDir, 'katex.ts'),
	],
	srcDir,
	outdir: outDir,
	additionalOptions: {
		external: ['@vscode/markdown-it-katex']
	}
}, process.argv, postBuild);
