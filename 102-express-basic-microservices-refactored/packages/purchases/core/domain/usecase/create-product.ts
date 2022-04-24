import { MessagingAdapter } from '../../data/adapter/messaging-adapter'
import { ProductInputRequest } from '../../data/request/product'
import { UseCaseInterface } from '../../data/usecase'
import { ProductRepository } from '../repository/product'
import { ProductModel } from '../model/product'
import { ProductProps } from '../../data/props/product'

export class CreateProductUseCase implements UseCaseInterface {
  constructor(private productRepository: ProductRepository, private messagingAdapter: MessagingAdapter) {}

  async execute({ title }: ProductInputRequest): Promise<ProductProps> {
    const data = new ProductModel({ title })

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

    return product.toJSON()
  }
}
