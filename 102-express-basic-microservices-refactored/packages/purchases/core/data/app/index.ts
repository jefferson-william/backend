import { FrameworkAppPayload } from '../adapter/routes-adapter'
import { ControllerRoutePayload } from '../controller'

export type AppAdapterPayload = {
  post<T, S>(route: string, fn: ControllerRoutePayload<T>): void
}

export interface FrameworkAppAdapterInterface {
  execute(payload: FrameworkAppPayload<any>): AppAdapterPayload
}
