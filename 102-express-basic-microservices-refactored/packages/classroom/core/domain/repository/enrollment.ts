import { Enrollment } from '../model/enrollment'
import { prisma } from '../../../prisma'

export class EnrollmentRepository {
  async create(enrollment: Enrollment) {
    await prisma.enrollment.create({
      data: {
        id: enrollment.id,
        studentId: enrollment.studentId,
        courseId: enrollment.courseId,
        createdAt: enrollment.createdAt,
        inactivatedAt: enrollment.inactivatedAt,
        purchasesEnrolledByPurchaseId: enrollment.purchasesEnrolledByPurchaseId,
      },
    })
  }
}
