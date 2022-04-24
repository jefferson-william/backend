import { Customer } from '../model/customer'
import { Purchase } from '../model/purchase'
import { CustomerRepository } from '../repository/customer'
import { ProductRepository } from '../repository/product'
import { PurchaseRepository } from '../repository/purchase'
import { PurchaseInputRequest } from '../../data/request/purchase'
import { UseCaseInterface } from '../../data/usecase'
import { CreatePurchaseOutput } from '../../data/message'

export class PurchaseProductUseCase implements UseCaseInterface {
  constructor(
    private customerRepository: CustomerRepository,
    private productRepository: ProductRepository,
    private purchaseRepository: PurchaseRepository,
  ) {}

  async execute({ name, email, productId }: PurchaseInputRequest): Promise<CreatePurchaseOutput> {
    const product = await this.productRepository.findById(productId)

    const productExists = !!product

    if (!productExists) {
      throw new Error('Products does not exists')
    }

    const customerData = new Customer({
      name,
      email,
    })

    const customer = await this.customerRepository.create(customerData)

    const purchaseData = new Purchase({
      customerId: customer.id,
      productId,
      createdAt: new Date(),
    })

    const purchase = await this.purchaseRepository.create(purchaseData)

    return {
      product,
      customer,
      purchase,
    }
  }
}
