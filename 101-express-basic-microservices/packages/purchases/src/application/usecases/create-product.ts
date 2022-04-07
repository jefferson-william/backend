import { Product } from '@prisma/client'
import { MessagingAdapter } from '../adapters/messaging-adapter'
import { ProductsRepository } from '../repositories/products-repository'

interface CreateProductRequest {
  title: string
}

export class CreateProduct {
  constructor(private productsRepository: ProductsRepository, private messagingAdapter: MessagingAdapter) {}

  async execute({ title }: CreateProductRequest): Promise<Product> {
    const product = await this.productsRepository.create(title)

    if (!product) {
      throw new Error('Product not created')
    }

    /**
     * This SHOULD NOT be here
     */
    await this.messagingAdapter.sendMessage('purchases.new-product', {
      product: {
        id: product.id,
        title: product.title,
      },
    })

    return product
  }
}
