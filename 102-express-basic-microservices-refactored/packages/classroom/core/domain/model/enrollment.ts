import crypto from 'node:crypto'
import { Maybe } from '../../../shared/data/types/Maybe'
import { EnrollmentProps } from '../../data/props/enrollment'

export class Enrollment {
  private _id: string
  private props: EnrollmentProps

  get id(): string {
    return this._id
  }

  get studentId(): string {
    return this.props.studentId
  }

  get courseId(): string {
    return this.props.courseId
  }

  get inactivatedAt(): Maybe<Date> {
    return this.props.inactivatedAt
  }

  get purchasesEnrolledByPurchaseId(): Maybe<string> {
    return this.props.purchasesEnrolledByPurchaseId
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  constructor(props: EnrollmentProps, id?: string) {
    this._id = id ?? crypto.randomUUID()
    this.props = props
  }
}
