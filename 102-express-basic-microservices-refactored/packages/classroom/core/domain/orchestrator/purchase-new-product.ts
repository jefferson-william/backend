import { OrchestratorPayload } from '../../data/orchestrator'
import { PurchasesNewProductMessage } from '../../data/message/purchases-new-product'
import { ProductToCourseUseCase } from '../usecase/product-to-course'

export class PurchasesNewProductOrchestrator {
  constructor(private productToCourseUseCase: ProductToCourseUseCase) {}

  async execute({ message }: OrchestratorPayload) {
    if (!message.value) {
      return
    }

    const data: PurchasesNewProductMessage = message.value as any

    try {
      await this.productToCourseUseCase.execute(data)
    } catch (err) {
      console.log(0)
    }

    console.log(`[Classroom] Product ${data.product.title} added as course`)
  }
}
