# Backend

Segue uma coletânea de informações e exemplos de uso de _frameworks_ e ferramentas.

A ideia deste repositório é ter vários exemplos de pequenos projetos _backend_ para posteridade.

## Nest.JS

[Nest.JS](https://docs.nestjs.com/) é um dos melhores _frameworks_ para NodeJS com fácil desenvolvimento e extensão.

Ficou muito famoso pela fácil implementação de _Microservices_.

O maior benefício de usá-lo é a facilidade de integrar tecnologias como _Microservices_, _GraphQL_ e _WebSockets_. O maior contra é por ele ser super opinativo graças aos _decorators_.

Segue alguns comandos iniciais:

```sh
yarn global add @nestjs/cli
nest new boilerplate
cd boilerplate
yarn install
nest g resource
```

## Express

Diferente do anterior, Express oferece mais liberdade. Ideial para aplicar sua própria estrutura a padrões.

Usado por baixo do Nest.JS, este é o mais conhecido _framework_ para NodeJS.

## Prisma

```sh
export DB_URL=postgresql://postgres:docker@localhost:5432/db
# others
npx prisma migrate dev
npx prisma migrate generate
npx prisma studio
```

#### Referências

- https://www.prisma.io/docs
- https://github.com/alitnk/nestjs-prisma-monorepo

## MongoDB

Banco de dados não relacional mais conhecido baseado em documentos.

Nas últimas versões possui funcionalidades incríveis como _Realtime_ e _Relationship_.

É possível criar um banco gratuitamente via https://cloud.mongodb.com.

## Docker Compose

Alguns comandos útils usados neste repositório.

```sh
# Pausando containers
docker stop $(docker ps -q)
# Derrubando containers
docker kill $(docker ps -q)
# Verificar se estão rodando
docker-compose logs zookeeper | grep -i binding
docker-compose logs kafka | grep -i started
# Para quando Kafka não ter tido tempo de sincronizar
docker-compose restart kafka
# Criar um tópico
docker-compose exec kafka kafka-topics --create --topic purchases --partitions 1 --replication-factor 1 --if-not-exists --zookeeper localhost:2181
docker-compose exec kafka kafka-topics --describe --topic purchases --zookeeper localhost:2181
# Reproduzindo mensagens com Producer
docker-compose exec kafka bash -c "seq 4 | kafka-console-producer --request-required-acks 1 --broker-list localhost:9092 --topic purchases && echo 'Produced 4 messages.'"
# Consumindo mensagens com o Consumer
docker-compose exec kafka kafka-console-consumer --bootstrap-server localhost:9092 --topic purchases --from-beginning --max-messages 100
# Criar uma network manualmente caso utilize VPN
docker network create traefik --subnet=10.50.0.2/24
```
