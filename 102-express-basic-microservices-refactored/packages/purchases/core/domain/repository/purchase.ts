import { prisma } from '../../../prisma'
import { PurchaseModel } from '../model/purchase'

export class PurchaseRepository {
  async create(purchase: PurchaseModel) {
    const data = await prisma.purchase.create({
      data: {
        id: purchase.id,
        customerId: purchase.customerId,
        productId: purchase.productId,
        createdAt: purchase.createdAt,
      },
    })

    return new PurchaseModel(data, data.id)
  }
}
