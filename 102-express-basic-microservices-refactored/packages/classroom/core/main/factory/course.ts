import { PurchasesNewProductOrchestrator } from '../../domain/orchestrator/purchase-new-product'
import { CourseRepository } from '../../domain/repository/course'
import { ProductToCourseUseCase } from '../../domain/usecase/product-to-course'

export class CourseFactory {
  getRepository() {
    return new CourseRepository()
  }

  getUseCase() {
    return {
      productToCourse: new ProductToCourseUseCase(this.getRepository()),
    }
  }

  getOrchestrator() {
    return {
      purchasesNewProduct: new PurchasesNewProductOrchestrator(this.getUseCase().productToCourse),
    }
  }
}
