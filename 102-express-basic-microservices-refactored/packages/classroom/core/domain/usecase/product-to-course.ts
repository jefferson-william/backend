import { Course } from '../model/course'
import { ProductToCourseRequest } from '../../data/request/product-to-course'
import { CourseRepository } from '../repository/course'

export class ProductToCourseUseCase {
  constructor(private coursesRepository: CourseRepository) {}

  async execute(request: ProductToCourseRequest): Promise<void> {
    const course = new Course({
      title: request.product.title,
      purchasesProductId: request.product.id,
    })

    await this.coursesRepository.create(course)
  }
}
