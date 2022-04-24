bootstrap: node_env env init db dev

node_env:
	export NODE_ENV=development
	export APP_ENV=dev

env: node_env
	cp .env.db.example .env.db
	cp .env.dev.example .env.dev

up: node_env
	docker-compose up

restart:
	docker-compose restart kafka

init:
	yarn install
	docker-compose pull

db: node_env
	yarn classroom prisma migrate dev # see packages/purchases/scripts/init.sh for more commands
	yarn purchases prisma migrate dev
	yarn classroom prisma generate # https://www.prisma.io/docs/concepts/components/prisma-client#4-evolving-your-application
	yarn purchases prisma generate

dev: node_env
	yarn concurrently --kill-others-on-fail \
		'yarn classroom dev' \
		'yarn purchases dev' \
		-n classroom,purchases \
		-c magenta,green

studio: node_env
	yarn concurrently --kill-others-on-fail \
		'yarn classroom prisma studio' \
		'yarn purchases prisma studio' \
		-n classroom,purchases \
		-c magenta,green
