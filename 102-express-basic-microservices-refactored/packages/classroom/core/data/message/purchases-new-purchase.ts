import { Product } from './product'

export interface PurchasesNewPurchaseMessage {
  product: Product
  customer: {
    name: string
    email: string
  }
  purchaseId: string
}
