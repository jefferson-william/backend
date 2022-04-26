import '../../../infra/environment'
import { Kafka } from 'kafkajs'

if (!process.env.KAFKA_BROKER) {
  throw new Error('Kafka broker address not set!')
}

export const kafka = new Kafka({
  clientId: 'purchases',
  brokers: [process.env.KAFKA_BROKER],
  ...(process.env.KAFKA_USER
    ? {
        sasl: {
          mechanism: 'scram-sha-256',
          username: process.env.KAFKA_USER ?? '',
          password: process.env.KAFKA_PASS ?? '',
        },
        ssl: process.env.KAFKA_SSL,
      }
    : {}),
})

export const producer = kafka.producer({
  allowAutoTopicCreation: true,
})

producer.connect().then(() => {
  console.log('[Purchases] Kafka producer connected')
})
