import { CreateProductController } from '../../../presentation/http/controller/product'
import { kafkaMessagingAdapter } from '../../adapter/messaging'
import { ProductRepository } from '../../domain/repository/product'
import { CreateProductUseCase } from '../../domain/usecase/create-product'

export class ProductFactory {
  getRepository() {
    return new ProductRepository()
  }

  getUseCase() {
    return {
      createProductUseCase: new CreateProductUseCase(this.getRepository(), kafkaMessagingAdapter),
    }
  }

  getController() {
    return {
      create: new CreateProductController(this).execute,
    }
  }
}
