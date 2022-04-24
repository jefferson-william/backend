import { Customer } from '../model/customer'
import { Purchase } from '../model/purchase'
import { CustomerRepository } from '../repository/customer'
import { ProductRepository } from '../repository/product'
import { PurchaseRepository } from '../repository/purchase'
import { MessagingAdapter } from '../../data/adapter/messaging-adapter'
import { PurchaseInputRequest } from '../../data/request/purchase'
import { UseCaseInterface } from '../../data/usecase'

export class PurchaseProductUseCase implements UseCaseInterface {
  constructor(
    private customerRepository: CustomerRepository,
    private productRepository: ProductRepository,
    private purchaseRepository: PurchaseRepository,
    private messagingAdapter: MessagingAdapter,
  ) {}

  async execute({ name, email, productId }: PurchaseInputRequest): Promise<void> {
    const product = await this.productRepository.findById(productId)

    const productExists = !!product

    if (!productExists) {
      throw new Error('Products does not exists')
    }

    const customer = new Customer({
      name,
      email,
    })

    await this.customerRepository.create(customer)

    const purchase = new Purchase({
      customerId: customer.id,
      productId,
      createdAt: new Date(),
    })

    await this.purchaseRepository.create(purchase)

    /**
     * This SHOULD NOT be here
     */
    await this.messagingAdapter.sendMessage('purchases.new-purchase', {
      product: {
        id: product.id,
        title: product.title,
      },
      customer: {
        name: customer.name,
        email: customer.email,
      },
      purchaseId: purchase.id,
    })
  }
}
