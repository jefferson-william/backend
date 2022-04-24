import crypto from 'node:crypto'
import { Model } from '../../data/model'
import { ProductProps } from '../../data/props/product'

export class ProductModel implements ProductProps, Model<ProductProps> {
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

  toJSON(): ProductProps {
    return {
      id: this.id,
      ...this.props,
    }
  }
}
