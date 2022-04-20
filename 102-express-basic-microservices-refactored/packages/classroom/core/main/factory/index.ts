import { CourseFactory } from './course'
import { EnrollmentFactory } from './enrollment'
import { StudentFactory } from './student'

export const courseFactory = new CourseFactory()

export const enrollmentFactory = new EnrollmentFactory()

export const studentFactory = new StudentFactory()
