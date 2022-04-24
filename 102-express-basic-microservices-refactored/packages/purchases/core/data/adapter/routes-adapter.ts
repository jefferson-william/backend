import { ControllerAdapter } from '../../adapter'
import { AppAdapterPayload } from '../app'
import { ControllerAdapterInterface } from '../controller'

export type RoutesAdapterPayload = {
  appAdapter: AppAdapterPayload
  controllerAdapter: ControllerAdapter
}

export type FrameworkAppPayload<T> = {
  app: T
  controllerAdapter: ControllerAdapterInterface
}
