import { StudentRepository } from '../../domain/repository/student'

export class StudentFactory {
  getRepository() {
    return new StudentRepository()
  }
}
