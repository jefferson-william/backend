import { TOPIC } from '../enum'

export type OrchestratorPayload = {
  topic: TOPIC
  message: {
    value?: object
  }
}
