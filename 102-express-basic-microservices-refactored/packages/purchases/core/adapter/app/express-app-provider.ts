import { Express } from 'express'
import { FrameworkAppPayload } from '../../data/adapter/routes-adapter'
import { AppAdapterPayload } from '../../data/app'

export class ExpressAppProvider implements AppAdapterPayload {
  constructor(private payload: FrameworkAppPayload<Express>) {}

  post<T, S>(route: string, fn: any) {
    return this.payload.app.post(route, fn)
  }
}
