const path = require('path')
const customEnv = require('custom-env')

if (process.env.NODE_ENV === 'development') {
  customEnv.env(process.env.APP_ENV, path.resolve(`${__dirname}/../../../../../`))
}

import express from 'express'
import cors from 'cors'

import { PrismaCustomersRepository } from '../database/prisma/repositories/prisma-customers-repository'
import { PrismaProductsRepository } from '../database/prisma/repositories/prisma-products-repository'
import { PrismaPurchasesRepository } from '../database/prisma/repositories/prisma-purchases-repository'
import { PurchaseProduct } from '../../application/usecases/purchase-product'
import { KafkaMessagingAdapter } from '../messaging/kafka/adapters/kafka-messaging-adapter'
import { CreateProduct } from '../../application/usecases/create-product'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  return res.json({ ok: true })
})

app.post('/purchases', async (request, response) => {
  const { productId, name, email } = request.body

  const prismaCustomersRepository = new PrismaCustomersRepository()
  const prismaProductsRepository = new PrismaProductsRepository()
  const prismaPurchasesRepository = new PrismaPurchasesRepository()
  const kafkaMessagingAdapter = new KafkaMessagingAdapter()

  const purchaseProductUseCase = new PurchaseProduct(
    prismaCustomersRepository,
    prismaProductsRepository,
    prismaPurchasesRepository,
    kafkaMessagingAdapter,
  )

  try {
    await purchaseProductUseCase.execute({
      name,
      email,
      productId,
    })

    return response.status(201).send()
  } catch (err) {
    console.error(err)

    return response.status(400).json({
      error: 'Error while creating a new purchase',
    })
  }
})

app.post('/products', async (request, response) => {
  const { title } = request.body

  const prismaProductsRepository = new PrismaProductsRepository()
  const kafkaMessagingAdapter = new KafkaMessagingAdapter()

  const createProductUseCase = new CreateProduct(prismaProductsRepository, kafkaMessagingAdapter)

  try {
    const product = await createProductUseCase.execute({ title })

    return response.status(201).send(product)
  } catch (err) {
    console.error(err)

    return response.status(400).json({
      error: 'Error while creating a new product',
    })
  }
})

app.listen(process.env.PORT, () => {
  console.log('[Purchases] Server running')
})
