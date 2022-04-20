import { EnrollStudentToCourseRequest } from '../../data/request/enrollment-student-to-course'
import { Course } from '../model/course'
import { Enrollment } from '../model/enrollment'
import { Student } from '../model/student'
import { CourseRepository } from '../repository/course'
import { EnrollmentRepository } from '../repository/enrollment'
import { StudentRepository } from '../repository/student'

export class EnrollStudentToCourseUseCase {
  constructor(
    private studentsRepository: StudentRepository,
    private coursesRepository: CourseRepository,
    private enrollmentsRepository: EnrollmentRepository,
  ) {}

  async execute(request: EnrollStudentToCourseRequest): Promise<void> {
    let course = await this.coursesRepository.findByPurchasesProductId(request.course.purchasesProductId)

    if (!course) {
      course = new Course({
        title: request.course.title,
        purchasesProductId: request.course.purchasesProductId,
      })

      await this.coursesRepository.create(course)
    }

    let student = await this.studentsRepository.findByEmail(request.student.email)

    if (!student) {
      student = new Student({
        name: request.student.name,
        email: request.student.email,
      })

      await this.studentsRepository.create(student)
    }

    const enrollment = new Enrollment({
      courseId: course.id,
      studentId: student.id,
      createdAt: new Date(),
      purchasesEnrolledByPurchaseId: request.purchasesEnrolledByPurchaseId,
    })

    await this.enrollmentsRepository.create(enrollment)
  }
}
