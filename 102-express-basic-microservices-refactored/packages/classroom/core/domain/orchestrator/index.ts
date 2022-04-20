import { TOPIC } from '../../data/enum'
import { OrchestratorPayload } from '../../data/orchestrator'
import { CourseFactory } from '../../main/factory/course'
import { EnrollmentFactory } from '../../main/factory/enrollment'

export class OrchestratorMessaging {
  constructor(private courseFactory: CourseFactory, private enrollmentFactory: EnrollmentFactory) {}

  execute = async (payload: OrchestratorPayload) => {
    switch (payload.topic) {
      case TOPIC.NEW_PRODUCT:
        return this.courseFactory.getOrchestrator().purchasesNewProduct.execute(payload)
        break
      case TOPIC.NEW_PURCHASE:
        return this.enrollmentFactory.getOrchestrator().purchasesNewPurchase.execute(payload)
        break
    }
  }
}
