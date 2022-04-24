import { CustomerProps } from '../props/customer'
import { ProductProps } from '../props/product'
import { PurchaseProps } from '../props/purchase'

export type CreatePurchaseOutput = {
  product: ProductProps
  customer: CustomerProps
  purchase: PurchaseProps
}
