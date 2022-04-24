import { prisma } from '../../../prisma'
import { Customer } from '../model/customer'

export class CustomerRepository {
  async create(customer: Customer) {
    await prisma.customer.create({
      data: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
      },
    })
  }
}
