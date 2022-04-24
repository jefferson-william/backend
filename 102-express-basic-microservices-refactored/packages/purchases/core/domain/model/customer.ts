import crypto from 'node:crypto'
import { Model } from '../../data/model'
import { CustomerProps } from '../../data/props/customer'

export class CustomerModel implements CustomerProps, Model<CustomerProps> {
  private _id: string
  private props: CustomerProps

  get id(): string {
    return this._id
  }

  get name(): string {
    return this.props.name
  }

  get email(): string {
    return this.props.email
  }

  constructor(props: CustomerProps, id?: string) {
    this._id = id ?? crypto.randomUUID()
    this.props = props
  }

  toJSON(): CustomerProps {
    return {
      id: this.id,
      ...this.props,
    }
  }
}
