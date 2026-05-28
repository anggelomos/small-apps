ALIAS ?= ang-small-apps.vercel.app

.PHONY: deploy
deploy:
	@node scripts/deploy-vercel.mjs "$(ALIAS)"
