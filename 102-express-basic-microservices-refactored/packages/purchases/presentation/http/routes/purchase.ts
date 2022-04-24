import { RoutesAdapterPayload } from '../../../core/data/adapter/routes-adapter'
import { ProductInputRequest } from '../../../core/data/request/product'
import { PurchaseInputRequest } from '../../../core/data/request/purchase'
import { productFactory, purchaseFactory } from '../../../core/main/factory'

export const routes = ({ appAdapter, controllerAdapter }: RoutesAdapterPayload) => {
  appAdapter.post<ProductInputRequest, ProductInputRequest>(
    '/products',
    controllerAdapter.execute(productFactory.getController().create),
  )

  appAdapter.post<PurchaseInputRequest, PurchaseInputRequest>(
    '/purchases',
    controllerAdapter.execute(purchaseFactory.getController().create),
  )
}
