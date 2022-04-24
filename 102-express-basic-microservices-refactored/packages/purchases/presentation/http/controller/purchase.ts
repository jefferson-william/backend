import { ControllerInterface, ControllerRoutePayload } from '../../../core/data/controller'
import { PurchaseInputRequest } from '../../../core/data/request/purchase'
import { PurchaseFactory } from '../../../core/main/factory/purchase'

export class PurchaseCreateController implements ControllerInterface {
  constructor(private purchaseFactory: PurchaseFactory) {}

  execute = async ({ request, response }: ControllerRoutePayload<PurchaseInputRequest>) => {
    const { productId, name, email } = request.body

    try {
      await this.purchaseFactory.getUseCase().purchaseProductUseCase.execute({
        name,
        email,
        productId,
      })

      return response.status(201).send()
    } catch (err) {
      console.error(err)

      return response.status(400).json({
        error: 'Error while creating a new purchase',
      })
    }
  }
}
