import express from 'express'
import cors from 'cors'
import { ControllerAdapter } from '../../core/adapter'
import { ExpressControllerAdapter } from '../../core/adapter/controller/express-controller-adapter'
import { routes } from './routes/purchase'
import { AppAdapter, ExpressAppAdapter } from '../../core/adapter/app'

const app = express()

app.use(express.json())
app.use(cors())

const controllerAdapter = new ControllerAdapter(new ExpressControllerAdapter())
const frameworkAdapter = new ExpressAppAdapter()
const appAdapter = new AppAdapter(frameworkAdapter, controllerAdapter).execute(app)

routes({ appAdapter, controllerAdapter })

app.get('/', (req, res) => {
  return res.json({ ok: true })
})

// app.post('/purchases', async (request, response) => {
//   const { productId, name, email } = request.body

//   try {
//     await purchaseFactory.getUseCase().purchaseProductUseCase.execute({
//       name,
//       email,
//       productId,
//     })

//     return response.status(201).send()
//   } catch (err) {
//     console.error(err)

//     return response.status(400).json({
//       error: 'Error while creating a new purchase',
//     })
//   }
// })

// app.post('/products', async (request, response) => {
//   const { title } = request.body

//   try {
//     const product = await productFactory.getUseCase().createProductUseCase.execute({ title })

//     return response.status(201).send(product)
//   } catch (err) {
//     console.error(err)

//     return response.status(400).json({
//       error: 'Error while creating a new product',
//     })
//   }
// })

app.listen(process.env.PURCHASES_PORT, () => {
  console.log('[Purchases] Server running')
})
