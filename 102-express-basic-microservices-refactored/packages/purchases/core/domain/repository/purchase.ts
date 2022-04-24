import { prisma } from '../../../prisma'
import { Purchase } from '../model/purchase'

export class PurchaseRepository {
  async create(purchase: Purchase) {
    await prisma.purchase.create({
      data: {
        id: purchase.id,
        customerId: purchase.customerId,
        productId: purchase.productId,
        createdAt: purchase.createdAt,
      },
    })
  }
}
