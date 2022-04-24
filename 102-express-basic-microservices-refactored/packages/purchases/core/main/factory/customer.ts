import { CustomerRepository } from '../../domain/repository/customer'

export class CustomerFactory {
  getRepository() {
    return new CustomerRepository()
  }
}
