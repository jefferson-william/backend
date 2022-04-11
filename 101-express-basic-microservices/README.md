# express-basic-microservices

<p align="center">
  <img src="https://user-images.githubusercontent.com/2935122/162804118-754281af-5606-4206-be4a-f0ff84284cb4.gif" title="101-express-basic-microservices" />
</p>

Um exemplo básico e simples de _microservices_.

## Utilidades

Comandos úteis usados durante desenvolvimento.

```sh
cp .env.db.example .env.db
cp .env.dev.example .env.dev
yarn install
yarn dev
yarn classroom prisma migrate dev # see packages/purchases/scripts/init.sh for more commands
yarn purchases prisma migrate dev
yarn classroom prisma generate # https://www.prisma.io/docs/concepts/components/prisma-client#4-evolving-your-application
yarn purchases prisma generate
```

[Vídeo](https://github.com/jefferson-william/backend/files/8466809/101-express-basic-microservices.mp4.zip) e
[arquivo do Insomnia](https://github.com/jefferson-william/backend/files/8466805/101-express-basic-microservices-Insomnia-All_2022-04-11.json.zip)
de exemplo da execução do projeto.
