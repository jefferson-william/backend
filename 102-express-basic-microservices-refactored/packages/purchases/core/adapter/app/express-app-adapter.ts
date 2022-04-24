import { Express } from 'express'
import { FrameworkAppPayload } from '../../data/adapter/routes-adapter'
import { AppAdapterPayload, FrameworkAppAdapterInterface } from '../../data/app'
import { ExpressAppProvider } from './express-app-provider'

export class ExpressAppAdapter implements FrameworkAppAdapterInterface {
  constructor() {}

  execute(payload: FrameworkAppPayload<Express>): AppAdapterPayload {
    return new ExpressAppProvider(payload)
  }
}
