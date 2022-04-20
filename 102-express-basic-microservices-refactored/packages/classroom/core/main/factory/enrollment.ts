import { courseFactory, studentFactory } from './index'
import { EnrollmentRepository } from '../../domain/repository/enrollment'
import { EnrollStudentToCourseUseCase } from '../../domain/usecase/enroll-student-to-course'
import { PurchasesNewPurchaseOrchestrator } from '../../domain/orchestrator/purchase-new-purchase'

export class EnrollmentFactory {
  getRepository() {
    return new EnrollmentRepository()
  }

  getUseCase() {
    return {
      enrollStudentToCourse: new EnrollStudentToCourseUseCase(
        studentFactory.getRepository(),
        courseFactory.getRepository(),
        this.getRepository(),
      ),
    }
  }

  getOrchestrator() {
    return {
      purchasesNewPurchase: new PurchasesNewPurchaseOrchestrator(this.getUseCase().enrollStudentToCourse),
    }
  }
}
