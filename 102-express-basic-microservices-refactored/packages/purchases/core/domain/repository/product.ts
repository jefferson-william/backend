import { prisma } from '../../../prisma'
import { Product } from '../model/product'

export class ProductRepository {
  async create(data: Product): Promise<Product | null> {
    const product = await prisma.product.create({
      data: {
        id: data.id,
        title: data.title,
      },
    })

    return new Product(
      {
        title: product.title,
      },
      product.id,
    )
  }

  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { id: id },
    })

    if (!product) {
      return null
    }

    return new Product(
      {
        title: product.title,
      },
      product.id,
    )
  }
}
