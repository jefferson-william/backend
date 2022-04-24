import { MessagingAdapter } from '../../data/adapter/messaging-adapter'
import { ProductInputRequest } from '../../data/request/product'
import { UseCaseInterface } from '../../data/usecase'
import { ProductRepository } from '../repository/product'
import { Product } from '../model/product'

export class CreateProductUseCase implements UseCaseInterface {
  constructor(private productRepository: ProductRepository, private messagingAdapter: MessagingAdapter) {}

  async execute({ title }: ProductInputRequest): Promise<Product> {
    const data = new Product({ title })

    const product = await this.productRepository.create(data)

    if (!product) {
      throw new Error('Product not created')
    }

    await this.messagingAdapter.sendMessage('purchases.new-product', {
      product: {
        id: product.id,
        title: product.title,
      },
    })

    return product
  }
}
