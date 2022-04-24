import { ControllerInterface, ControllerRoutePayload } from '../../../core/data/controller'
import { ProductInputRequest } from '../../../core/data/request/product'
import { ProductFactory } from '../../../core/main/factory/product'

export class CreateProductController implements ControllerInterface {
  constructor(private productFactory: ProductFactory) {}

  execute = async ({ request, response }: ControllerRoutePayload<ProductInputRequest>): Promise<void> => {
    try {
      const product = await this.productFactory.getUseCase().createProductUseCase.execute(request.body)

      return response.status(201).send(product)
    } catch (err) {
      console.error(err)

      return response.status(400).json({
        error: 'Error while creating a new product',
      })
    }
  }
}
