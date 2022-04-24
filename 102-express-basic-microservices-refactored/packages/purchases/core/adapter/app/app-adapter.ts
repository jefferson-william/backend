import { FrameworkAppAdapterInterface } from '../../data/app'
import { ControllerAdapterInterface } from '../../data/controller'

export class AppAdapter {
  constructor(
    private frameworkAdapter: FrameworkAppAdapterInterface,
    private controllerAdapter: ControllerAdapterInterface,
  ) {}

  execute(app: any) {
    return this.frameworkAdapter.execute({
      app,
      controllerAdapter: this.controllerAdapter,
    })
  }
}
