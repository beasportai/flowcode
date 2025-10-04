/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

// Increase max listeners for event emitters
require('events').EventEmitter.defaultMaxListeners = 100;

const gulp = require('gulp');
const util = require('./lib/util');
const task = require('./lib/task');
const { transpileClientSWC, transpileTask, compileTask, watchTask, compileApiProposalNamesTask } = require('./lib/compilation');
const { monacoTypecheckTask } = require('./gulpfile.editor');
const { compileExtensionsVercelTask, compileExtensionMediaTask } = require('./gulpfile.extensions');

// API proposal names
gulp.task(compileApiProposalNamesTask);

// SWC Client Transpile (faster than full compilation)
const transpileClientSWCTask = task.define('transpile-client-esbuild', task.series(util.rimraf('out'), transpileTask('src', 'out', true)));
gulp.task(transpileClientSWCTask);

// Optimized Vercel build - minimal extensions, no mangling
const compileVercelOptimizedTask = task.define('compile-vercel-optimized',
	task.parallel(
		monacoTypecheckTask,
		transpileClientSWCTask,
		compileExtensionsVercelTask,
		compileExtensionMediaTask
	)
);
gulp.task(compileVercelOptimizedTask);

// Build with disabled mangling for Vercel
const compileBuildVercelTask = task.define('compile-build-vercel',
	task.series(
		util.rimraf('out-build'),
		task.define('build-date-file', () => {
			const fs = require('fs');
			const path = require('path');
			const buildDate = new Date().toISOString();
			const buildDateFile = path.join(__dirname, '../out-build/build-date.txt');
			fs.writeFileSync(buildDateFile, buildDate);
		}),
		compileApiProposalNamesTask,
		compileTask('src', 'out-build', true, { disableMangle: true }) // Disable mangling
	)
);
gulp.task(compileBuildVercelTask);

// Default optimized task
gulp.task('default', compileVercelOptimizedTask);

process.on('unhandledRejection', (reason, p) => {
	console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
	process.exit(1);
});

// Load all the gulpfiles only if running tasks other than the editor tasks
require('glob').sync('gulpfile.*.js', { cwd: __dirname })
	.forEach(f => require(`./${f}`));
