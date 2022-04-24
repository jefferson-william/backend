import { prisma } from '../../../prisma'
import { ProductModel } from '../model/product'

export class ProductRepository {
  async create(data: ProductModel): Promise<ProductModel | null> {
    const product = await prisma.product.create({
      data: {
        id: data.id,
        title: data.title,
      },
    })

    return new ProductModel(product, product.id)
  }

  async findById(id: string): Promise<ProductModel | null> {
    const product = await prisma.product.findUnique({
      where: { id: id },
    })

    if (!product) {
      return null
    }

    return new ProductModel(product, product.id)
  }
}
