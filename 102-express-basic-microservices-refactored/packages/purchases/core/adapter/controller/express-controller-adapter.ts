import { Request, Response } from 'express'
import {
  ControllerRoutePayload,
  ControllerRouteInterface,
  FrameworkControllerAdapterInterface,
} from '../../data/controller'
import { HttpRequest, HttpResponse } from '../../data/http'

export class ExpressControllerAdapter implements FrameworkControllerAdapterInterface {
  constructor() {}

  execute<T>(fn: ControllerRouteInterface<T>) {
    return (req: Request, res: Response) => {
      return fn({
        request: this.getRequest<T>(req),
        response: this.getResponse<T>(res),
      } as ControllerRoutePayload<T>)
    }
  }

  private getRequest<T>(req: Request): HttpRequest<T> {
    return {
      body: req.body,
    }
  }

  private getResponse<T>(res: Response): HttpResponse<T> {
    return {
      status: (...args) => {
        res.status(...args)
        return res
      },
    }
  }
}
