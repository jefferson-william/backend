import { Student } from '../model/student'
import { prisma } from '../../../prisma'

export class StudentRepository {
  async findByEmail(email: string): Promise<Student | null> {
    const student = await prisma.student.findUnique({
      where: {
        email,
      },
    })

    if (!student) {
      return null
    }

    return new Student(
      {
        name: student.name,
        email: student.email,
      },
      student.id,
    )
  }

  async create(student: Student) {
    await prisma.student.create({
      data: {
        id: student.id,
        name: student.name,
        email: student.email,
      },
    })
  }
}
