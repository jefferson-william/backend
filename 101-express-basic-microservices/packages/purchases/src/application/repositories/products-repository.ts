import { Product } from '../../domain/product'

export interface ProductsRepository {
  create(product: Product): Promise<Product | null>
  findById(id: string): Promise<Product | null>
}
