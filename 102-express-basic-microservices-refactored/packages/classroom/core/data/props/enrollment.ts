import { Maybe } from '../../../shared/data/types/Maybe'

export interface EnrollmentProps {
  studentId: string
  courseId: string
  createdAt: Date
  purchasesEnrolledByPurchaseId?: Maybe<string>
  inactivatedAt?: Maybe<Date>
}
