import { Product } from '../../domain/product'

export interface ProductsRepository {
  create(title: string): Promise<Product | null>
  findById(id: string): Promise<Product | null>
}
