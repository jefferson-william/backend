import {
  ControllerAdapterInterface,
  ControllerRouteInterface,
  FrameworkControllerAdapterInterface,
} from '../../data/controller'

export class ControllerAdapter implements ControllerAdapterInterface {
  constructor(private controllerAdapter: FrameworkControllerAdapterInterface) {}

  execute(fn: ControllerRouteInterface<any>) {
    return this.controllerAdapter.execute(fn)
  }
}
