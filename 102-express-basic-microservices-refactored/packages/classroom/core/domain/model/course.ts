import crypto from 'node:crypto'
import { CourseProps } from '../../data/props/course'
import { Maybe } from '../../../shared/data/types/Maybe'

export class Course {
  private _id: string
  private props: CourseProps

  get id(): string {
    return this._id
  }

  get title(): string {
    return this.props.title
  }

  get purchasesProductId(): Maybe<string> {
    return this.props.purchasesProductId
  }

  constructor(props: CourseProps, id?: string) {
    this._id = id ?? crypto.randomUUID()
    this.props = props
  }
}
