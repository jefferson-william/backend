import crypto from 'node:crypto'
import { ProductProps } from '../../data/props/product'

export class Product implements ProductProps {
  private _id: string
  private props: ProductProps

  get id(): string {
    return this._id
  }

  get title(): string {
    return this.props.title
  }

  constructor(props: ProductProps, id?: string) {
    this._id = id ?? crypto.randomUUID()
    this.props = props
  }
}
