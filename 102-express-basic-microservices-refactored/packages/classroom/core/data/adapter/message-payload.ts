import { OrchestratorPayload } from '../orchestrator'

export type MessageAdapterFn = {
  (payload: OrchestratorPayload): Promise<void>
}
