const customEnv = require('custom-env')

if (process.env.NODE_ENV === 'development') {
  customEnv.env(process.env.ENV_NAME)
  customEnv.env(process.env.ENV_NAME, '../../../../')
}

import { EnrollStudentToCourse } from '../../application/usecases/enroll-student-to-course'
import { PrismaCoursesRepository } from '../database/prisma/repositories/prisma-courses-repository'
import { PrismaEnrollmentsRepository } from '../database/prisma/repositories/prisma-enrollments-repository'
import { PrismaStudentsRepository } from '../database/prisma/repositories/prisma-students-repository'
import { kafka } from './kafka/kafka'
import { ProductToCourse } from '../../application/usecases/product-to-course'

interface Product {
  id: string
  title: string
}

interface PurchasesNewPurchaseMessage {
  product: Product
  customer: {
    name: string
    email: string
  }
  purchaseId: string
}

interface ProductMessage {
  product: {
    id: string
    title: string
  }
}

async function main() {
  const consumer = kafka.consumer({ groupId: 'classroom', allowAutoTopicCreation: true })

  await consumer.connect()
  await consumer.subscribe({ topic: 'purchases.new-purchase' })
  await consumer.subscribe({ topic: 'purchases.new-product' })

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      if (topic === 'purchases.new-product') {
        const productJSON = message.value?.toString()

        if (!productJSON) {
          return
        }

        const productMessage: ProductMessage = JSON.parse(productJSON)

        const prismaCourseRepository = new PrismaCoursesRepository()
        const productToCourse = new ProductToCourse(prismaCourseRepository)

        try {
          await productToCourse.execute(productMessage)
        } catch (err) {
          console.log(0)
        }

        console.log(`[Classroom] Product ${productMessage.product.title} added as course`)

        return
      }

      const purchaseJSON = message.value?.toString()

      if (!purchaseJSON) {
        return
      }

      const purchase: PurchasesNewPurchaseMessage = JSON.parse(purchaseJSON)

      const prismaStudentsRepository = new PrismaStudentsRepository()
      const prismaCourseRepository = new PrismaCoursesRepository()
      const prismaEnrollmentRepository = new PrismaEnrollmentsRepository()

      const enrollStudentToCourse = new EnrollStudentToCourse(
        prismaStudentsRepository,
        prismaCourseRepository,
        prismaEnrollmentRepository,
      )

      try {
        await enrollStudentToCourse.execute({
          student: {
            name: purchase.customer.name,
            email: purchase.customer.email,
          },
          course: {
            title: purchase.product.title,
            purchasesProductId: purchase.product.id,
          },
          purchasesEnrolledByPurchaseId: purchase.purchaseId,
        })
      } catch (err) {
        console.log(1)
      }

      console.log(`[Classroom] Enrolled user ${purchase.customer.name} to ${purchase.product.title}`)
    },
  })
}

main().then(() => {
  console.log('[Classroom] Listening to Kafka messages')
})
