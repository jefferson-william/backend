import { customerFactory, productFactory, purchaseFactory } from './index'
import { PurchaseRepository } from '../../domain/repository/purchase'
import { PurchaseProductUseCase } from '../../domain/usecase/purchase-product'
import { kafkaMessagingAdapter } from '../../adapter/messaging'
import { PurchaseCreateController } from '../../../presentation/http/controller/purchase'

export class PurchaseFactory {
  getRepository() {
    return new PurchaseRepository()
  }

  getUseCase() {
    return {
      purchaseProductUseCase: new PurchaseProductUseCase(
        customerFactory.getRepository(),
        productFactory.getRepository(),
        purchaseFactory.getRepository(),
        kafkaMessagingAdapter,
      ),
    }
  }

  getController() {
    return {
      create: new PurchaseCreateController(this).execute,
    }
  }
}
