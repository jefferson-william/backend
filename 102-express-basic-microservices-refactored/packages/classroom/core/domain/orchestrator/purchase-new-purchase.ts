import { PurchasesNewPurchaseMessage } from '../../data/message/purchases-new-purchase'
import { OrchestratorPayload } from '../../data/orchestrator'
import { EnrollStudentToCourseUseCase } from '../usecase/enroll-student-to-course'

export class PurchasesNewPurchaseOrchestrator {
  constructor(private enrollStudentToCourseUseCase: EnrollStudentToCourseUseCase) {}

  async execute({ message }: OrchestratorPayload) {
    if (!message.value) {
      return
    }

    const data: PurchasesNewPurchaseMessage = message.value as any

    try {
      await this.enrollStudentToCourseUseCase.execute({
        student: {
          name: data.customer.name,
          email: data.customer.email,
        },
        course: {
          title: data.product.title,
          purchasesProductId: data.product.id,
        },
        purchasesEnrolledByPurchaseId: data.purchaseId,
      })
    } catch (err) {
      console.log(1)
    }

    console.log(`[Classroom] Enrolled user ${data.customer.name} to ${data.product.title}`)
  }
}
