ALIAS ?= ang-small-apps.vercel.app

.PHONY: deploy
deploy:
	@node -e "const { execFileSync } = require('node:child_process'); const alias = process.argv[1]; const run = (cmd, args) => execFileSync(cmd, args, { encoding: 'utf8', shell: process.platform === 'win32' }); console.log('Deploying to Vercel production...'); const deployOutput = run('npx', ['vercel', '--prod', '--yes']); process.stdout.write(deployOutput); const urlMatch = deployOutput.match(/\"url\"\\s*:\\s*\"([^\"]+)\"/) || deployOutput.match(/Production\\s+(https?:\\/\\/\\S+)/); if (!urlMatch) { throw new Error('Could not find the deployment URL in Vercel output.'); } const deploymentHost = urlMatch[1].replace(/^https?:\\/\\//, '').replace(/\\/$$/, ''); console.log('Updating alias ' + alias + ' -> ' + deploymentHost + '...'); const aliasOutput = run('npx', ['vercel', 'alias', 'set', deploymentHost, alias]); process.stdout.write(aliasOutput); console.log('Done: https://' + alias);" "$(ALIAS)"
