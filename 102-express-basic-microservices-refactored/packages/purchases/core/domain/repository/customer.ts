import { prisma } from '../../../prisma'
import { CustomerModel } from '../model/customer'

export class CustomerRepository {
  async create(customer: CustomerModel) {
    const data = await prisma.customer.create({
      data: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
      },
    })

    return new CustomerModel(data, data.id)
  }
}
