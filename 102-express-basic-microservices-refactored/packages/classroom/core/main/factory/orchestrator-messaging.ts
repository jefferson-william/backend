import { courseFactory, enrollmentFactory } from './index'
import { OrchestratorMessaging } from '../../domain/orchestrator'

export const orchestratorMessagingFactory = new OrchestratorMessaging(courseFactory, enrollmentFactory)
