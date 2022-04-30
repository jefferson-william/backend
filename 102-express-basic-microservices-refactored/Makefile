.EXPORT_ALL_VARIABLES:

export NODE_ENV=development
export APP_ENV=dev

bootstrap: env init db dev

env:
	cp .env.local.example .env.local
	cp .env.dev.example .env.dev

up:
	docker-compose up

restart:
	docker-compose restart kafka

pull:
	docker-compose pull

init: pull
	yarn install

db:
	yarn classroom prisma migrate dev # see packages/purchases/scripts/init.sh for more commands
	yarn purchases prisma migrate dev
	yarn classroom prisma generate # https://www.prisma.io/docs/concepts/components/prisma-client#4-evolving-your-application
	yarn purchases prisma generate

dev:
	npx dotenv -e .env.local -- yarn concurrently --kill-others-on-fail \
		'yarn classroom dev' \
		'yarn purchases dev' \
		-n classroom,purchases \
		-c magenta,green

studio:
	npx dotenv -e .env.local -- yarn concurrently --kill-others-on-fail \
		'yarn classroom prisma studio' \
		'yarn purchases prisma studio' \
		-n classroom,purchases \
		-c magenta,green
