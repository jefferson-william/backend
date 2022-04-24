import { MessagingAdapter } from '../../../core/data/adapter/messaging-adapter'
import { ControllerInterface, ControllerRoutePayload } from '../../../core/data/controller'
import { PurchaseInputRequest } from '../../../core/data/request/purchase'
import { PurchaseFactory } from '../../../core/main/factory/purchase'

export class PurchaseCreateController implements ControllerInterface {
  constructor(private purchaseFactory: PurchaseFactory, private messagingAdapter: MessagingAdapter) {}

  execute = async ({ request, response }: ControllerRoutePayload<PurchaseInputRequest>) => {
    try {
      const data = await this.purchaseFactory.getUseCase().purchaseProductUseCase.execute(request.body)

      await this.messagingAdapter.sendMessage('purchases.new-purchase', data)

      return response.status(201).send(data)
    } catch (err) {
      console.error(err)

      return response.status(400).json({
        error: 'Error while creating a new purchase',
      })
    }
  }
}
