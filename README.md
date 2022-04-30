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

## Kafka

Trabalha com tópicos onde nem sempre a primeira que entrar será a primeira a sair tal como HabbitMQ porque
ele utiliza partições.

Num Consumer pode ter uma partição mais rápida que outra e com isso o _offset_ da fila
de um ou outro pode ser diferente.

As mensagens são armazenadas e mesmo que ele caia, consegue voltar a processar todas mensagens novamente.

Uma mensagem no Kafka não é removida. Ela é armazenada e marcada como processada.

Você pode configurar o período de retenção dessas mensagens processadas por mais que tenha um período padrão.

Principais características:

- Segurança;
- Resiliência;
- _Features_ essênciais;
- _Stream_ de dados;

### Comandos

```sh
docker exec -it 102-express-basic-microservices-refactored_kafka_1 bash
kafka-topics.sh --list --bootstrap-server kafka:9092
kafka-topics.sh --create --bootstrap-server kafka:9092 --partitions 3 --replication-factor 1 --topic test
kafka-topics.sh --describe --bootstrap-server kafka:9092 --topic test
kafka-console-producer.sh --bootstrap-server kafka:9092 --topic purchases.new-product
kafka-console-consumer.sh --bootstrap-server kafka:9092 --topic purchases.new-product
kafka-console-consumer.sh --bootstrap-server kafka:9092 --topic purchases.new-product --from-beginning
kafka-console-consumer.sh --bootstrap-server kafka:9092 --topic purchases.new-product --group purchases
kafka-consumer-groups.sh --bootstrap-server kafka:9092 --group purchases --describe
```

### Kafka Cluster

![image](https://user-images.githubusercontent.com/2935122/166109459-77191858-e6b8-416c-8e0b-009915b993fe.png)

Cada _Broker_ é um servidor e um conjunto de _brokers_ formam um _Cluster_.

Os _brokers_ são responsáveis por armazenar os dados de uma partição.

Ou seja: Cada partição de um _Topic_ está distribuído em diferentes _brokers_.

Com isso, entendemos que o Kafka é distribuído e as mensagens podem ficar em partições e servers diferentes.

### Replication Factor

![image](https://user-images.githubusercontent.com/2935122/166109774-a7488b13-d88f-495b-9901-c2c73ca8a8cf.png)

O Kafka trabalha com réplicas para que caso uma morra, você não perca o processamento de nenhum mensagem.

Com isso, você pode ter vários _Brokers_ e _Topics_ espalhados para garantir a entrega delas.

### Consumer group

![image](https://user-images.githubusercontent.com/2935122/166110018-71ec9a4d-4d7a-4545-953a-67290c5e55be.png)

Quando uma mensagem é lida por um _Consumer_, ela não será lida por outro.

_Group_ serve para ter um grupo de _Consumers_ por sistema onde você poderá ter adicionar mais _Consumers_.

## HabbitMQ

Diferentemente do _Kafka_, o _HabbitMQ_ não tem partições, apenas filas. Então ele lê tudo e após processar, as mensagens somem.

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
