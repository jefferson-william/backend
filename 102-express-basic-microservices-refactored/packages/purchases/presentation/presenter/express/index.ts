import express from 'express'
import cors from 'cors'
import { ControllerAdapter } from '../../../core/adapter'
import { ExpressControllerAdapter } from '../../../core/adapter/controller/express-controller-adapter'
import { routes } from '../../http/routes'
import { AppAdapter, ExpressAppAdapter } from '../../../core/adapter/app'

const app = express()

app.use(express.json())
app.use(cors())

const controllerAdapter = new ControllerAdapter(new ExpressControllerAdapter())
const frameworkAdapter = new ExpressAppAdapter()
const appAdapted = new AppAdapter(frameworkAdapter, controllerAdapter)
const appAdapter = appAdapted.execute(app)

routes({ appAdapter, controllerAdapter })

app.listen(process.env.PURCHASES_PORT, () => {
  console.log('[Purchases] Server running')
})
