import '../../infra/environment'
import { kafka } from './kafka/kafka'
import { TOPIC } from '../../core/data/enum'
import { orchestratorMessagingFactory } from '../../core/main/factory/orchestrator-messaging'
import { messageAdapter } from '../../core/adapter/messaging'

async function main() {
  const consumer = kafka.consumer({ groupId: 'classroom', allowAutoTopicCreation: true })

  await consumer.connect()
  await consumer.subscribe({ topic: TOPIC.NEW_PURCHASE })
  await consumer.subscribe({ topic: TOPIC.NEW_PRODUCT })

  await consumer.run({
    eachMessage: async (eachMessagePayload) => {
      const fn = orchestratorMessagingFactory.execute

      await messageAdapter.execute(fn, eachMessagePayload)
    },
  })
}

main().then(() => {
  console.log('[Classroom] Listening to Kafka messages')
})
