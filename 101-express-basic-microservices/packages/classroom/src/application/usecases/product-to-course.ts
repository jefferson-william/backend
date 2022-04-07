import { Course } from '../../domain/course'
import { CoursesRepository } from '../repositories/courses-repository'

interface ProductToCourseRequest {
  product: {
    id: string
    title: string
  }
}

export class ProductToCourse {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute(request: ProductToCourseRequest): Promise<void> {
    const course = new Course({
      title: request.product.title,
      purchasesProductId: request.product.id,
    })

    await this.coursesRepository.create(course)
  }
}
