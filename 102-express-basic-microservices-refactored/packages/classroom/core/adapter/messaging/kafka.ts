import { EachMessagePayload, KafkaMessage } from 'kafkajs'
import { MessageAdapterFn } from '../../data/adapter'
import { MessageAdapterInterface } from '../../data/adapter/message-adapter'
import { TOPIC } from '../../data/enum'
import { OrchestratorPayload } from '../../data/orchestrator'

export class KafkaMessageAdapter implements MessageAdapterInterface {
  async execute(fn: MessageAdapterFn, kafkaPayload: EachMessagePayload) {
    const { topic, message } = kafkaPayload
    const { value } = message

    const orchestratorPayload: OrchestratorPayload = {
      ...kafkaPayload,
      topic: topic as TOPIC,
      message: {
        ...message,
        value: value && JSON.parse(value.toString()),
      },
    }

    return fn(orchestratorPayload)
  }
}
