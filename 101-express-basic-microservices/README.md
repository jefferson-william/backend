# express-basic-microservices

Um exemplo básico e simples de _microservices_.

## Utilidades

Comandos úteis usados durante desenvolvimento.

```sh
cp packages/
yarn install
yarn dev
yarn classroom prisma migrate dev # see packages/purchases/scripts/init.sh for more commands
yarn purchases prisma migrate dev
yarn classroom prisma generate # https://www.prisma.io/docs/concepts/components/prisma-client#4-evolving-your-application
yarn purchases prisma generate
```
