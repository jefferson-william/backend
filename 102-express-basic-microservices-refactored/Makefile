bootstrap: env init db dev

env:
	cp .env.db.example .env.db
	cp .env.dev.example .env.dev

init:
	yarn install
	docker-compose pull

db:
	yarn classroom prisma migrate dev # see packages/purchases/scripts/init.sh for more commands
	yarn purchases prisma migrate dev
	yarn classroom prisma generate # https://www.prisma.io/docs/concepts/components/prisma-client#4-evolving-your-application
	yarn purchases prisma generate

dev:
	export NODE_ENV=development
	yarn concurrently --kill-others-on-fail \
		'yarn classroom dev' \
		'yarn purchases dev' \
		-n classroom,purchases \
		-c magenta,green

studio:
	yarn concurrently --kill-others-on-fail \
		'yarn classroom prisma studio' \
		'yarn purchases prisma studio' \
		-n classroom,purchases \
		-c magenta,green
