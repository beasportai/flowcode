#!/usr/bin/env node

/**
 * FlowCode Vercel Build Polling Script
 * Polls Vercel deployment status every minute until build completes
 */

const https = require('https');
const { execSync } = require('child_process');

// Configuration
const POLL_INTERVAL = 60000; // 1 minute in milliseconds
const MAX_POLL_ATTEMPTS = 60; // Maximum 1 hour of polling

// Colors for console output
const colors = {
	reset: '\x1b[0m',
	bright: '\x1b[1m',
	red: '\x1b[31m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	magenta: '\x1b[35m',
	cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
	console.log(`${colors[color]}${message}${colors.reset}`);
}

function getVercelProjectInfo() {
	try {
		// Get project info from Vercel CLI
		const output = execSync('vercel ls --json', { encoding: 'utf8' });
		const projects = JSON.parse(output);

		if (projects.length === 0) {
			throw new Error('No Vercel projects found. Make sure you have deployed to Vercel first.');
		}

		// Get the most recent project (assuming it's FlowCode)
		const project = projects[0];
		return {
			id: project.uid,
			name: project.name,
			url: project.url
		};
	} catch (error) {
		log(`❌ Error getting Vercel project info: ${error.message}`, 'red');
		process.exit(1);
	}
}

function getDeploymentStatus(projectId) {
	return new Promise((resolve, reject) => {
		const options = {
			hostname: 'api.vercel.com',
			port: 443,
			path: `/v6/deployments?projectId=${projectId}&limit=1`,
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${process.env.VERCEL_TOKEN || ''}`,
				'Content-Type': 'application/json'
			}
		};

		const req = https.request(options, (res) => {
			let data = '';

			res.on('data', (chunk) => {
				data += chunk;
			});

			res.on('end', () => {
				try {
					const response = JSON.parse(data);
					if (response.deployments && response.deployments.length > 0) {
						resolve(response.deployments[0]);
					} else {
						reject(new Error('No deployments found'));
					}
				} catch (error) {
					reject(error);
				}
			});
		});

		req.on('error', (error) => {
			reject(error);
		});

		req.end();
	});
}

function formatStatus(status) {
	const statusMap = {
		'BUILDING': { emoji: '🔨', color: 'yellow', text: 'Building' },
		'READY': { emoji: '✅', color: 'green', text: 'Ready' },
		'ERROR': { emoji: '❌', color: 'red', text: 'Error' },
		'CANCELED': { emoji: '⏹️', color: 'red', text: 'Canceled' },
		'QUEUED': { emoji: '⏳', color: 'blue', text: 'Queued' }
	};

	const statusInfo = statusMap[status] || { emoji: '❓', color: 'reset', text: status };
	return `${statusInfo.emoji} ${statusInfo.text}`;
}

async function pollBuildStatus() {
	log('🚀 Starting FlowCode Vercel build polling...', 'cyan');

	const projectInfo = getVercelProjectInfo();
	log(`📋 Project: ${projectInfo.name} (${projectInfo.id})`, 'blue');
	log(`🌐 URL: https://${projectInfo.url}`, 'blue');

	let attempts = 0;

	while (attempts < MAX_POLL_ATTEMPTS) {
		try {
			attempts++;
			log(`\n⏰ Polling attempt ${attempts}/${MAX_POLL_ATTEMPTS}...`, 'magenta');

			const deployment = await getDeploymentStatus(projectInfo.id);
			const status = deployment.state;
			const createdAt = new Date(deployment.createdAt).toLocaleString();

			log(`📊 Status: ${formatStatus(status)}`, status === 'READY' ? 'green' : status === 'ERROR' ? 'red' : 'yellow');
			log(`🕐 Created: ${createdAt}`, 'reset');

			if (deployment.url) {
				log(`🔗 URL: https://${deployment.url}`, 'cyan');
			}

			if (status === 'READY') {
				log('\n🎉 Build completed successfully!', 'green');
				log(`🌐 Your FlowCode app is live at: https://${deployment.url}`, 'green');
				log(`📱 You can now use FlowCode with all its AI features!`, 'green');
				process.exit(0);
			} else if (status === 'ERROR') {
				log('\n❌ Build failed!', 'red');
				if (deployment.error) {
					log(`Error details: ${deployment.error}`, 'red');
				}
				process.exit(1);
			} else if (status === 'CANCELED') {
				log('\n⏹️ Build was canceled!', 'red');
				process.exit(1);
			}

			// Wait before next poll
			log(`⏳ Waiting ${POLL_INTERVAL / 1000} seconds before next check...`, 'yellow');
			await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL));

		} catch (error) {
			log(`❌ Error polling build status: ${error.message}`, 'red');

			if (attempts >= MAX_POLL_ATTEMPTS) {
				log('\n⏰ Maximum polling attempts reached. Build may still be in progress.', 'yellow');
				log('🌐 Check your Vercel dashboard for the latest status.', 'blue');
				process.exit(1);
			}

			// Wait before retry
			await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL));
		}
	}
}

// Handle process termination
process.on('SIGINT', () => {
	log('\n\n⏹️ Polling stopped by user.', 'yellow');
	log('🌐 Check your Vercel dashboard for build status.', 'blue');
	process.exit(0);
});

// Start polling
pollBuildStatus().catch((error) => {
	log(`❌ Fatal error: ${error.message}`, 'red');
	process.exit(1);
});
