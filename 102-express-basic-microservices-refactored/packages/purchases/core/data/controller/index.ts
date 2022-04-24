import { HttpRequest, HttpResponse } from '../http'

export type ControllerRoutePayload<T> = {
  request: HttpRequest<T>
  response: HttpResponse<any>
}

export interface ControllerRouteInterface<T> {
  (payload: ControllerRoutePayload<T>): Promise<void>
}

export interface ControllerAdapterInterface {
  execute(fn: any): any
}

export interface ControllerInterface {
  execute(payload: ControllerRoutePayload<any>): any
}

export interface FrameworkControllerAdapterInterface {
  execute<T>(fn: ControllerRouteInterface<T>): any
}
