import { producer } from '../../../presentation/messaging/kafka'
import { MessagingAdapter } from '../../data/adapter/messaging-adapter'

export class KafkaMessagingAdapter implements MessagingAdapter {
  async sendMessage(topic: string, message: any) {
    console.log(`[Purchases] New message on topic "${topic}"`)
    console.log(JSON.stringify(message, null, 2))

    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    })
  }
}
