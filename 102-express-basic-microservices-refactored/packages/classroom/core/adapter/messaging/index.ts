import { MessageAdapter } from './message-adapter'
import { KafkaMessageAdapter } from './kafka'

export const kafkaMessageAdapter = new KafkaMessageAdapter()

export const messageAdapter = new MessageAdapter(kafkaMessageAdapter)
