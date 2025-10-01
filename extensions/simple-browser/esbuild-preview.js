/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// @ts-check
const path = require('path');

const srcDir = path.join(__dirname, 'preview-src');
const outDir = path.join(__dirname, 'media');

// Try extension's node_modules first, then fall back to main project's node_modules
const extensionNodeModules = path.join(__dirname, 'node_modules');
const mainNodeModules = path.join(__dirname, '../../../../node_modules');

let codiconPath;
if (require('fs').existsSync(path.join(extensionNodeModules, '@vscode', 'codicons', 'dist', 'codicon.css'))) {
	codiconPath = path.join(extensionNodeModules, '@vscode', 'codicons', 'dist', 'codicon.css');
} else {
	codiconPath = path.join(mainNodeModules, '@vscode', 'codicons', 'dist', 'codicon.css');
}

require('../esbuild-webview-common').run({
	entryPoints: {
		'index': path.join(srcDir, 'index.ts'),
		'codicon': codiconPath,
	},
	srcDir,
	outdir: outDir,
	additionalOptions: {
		loader: {
			'.ttf': 'dataurl',
		}
	}
}, process.argv);
