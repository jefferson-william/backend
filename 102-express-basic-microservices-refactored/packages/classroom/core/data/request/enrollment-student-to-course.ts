export type EnrollStudentToCourseRequest = {
  student: {
    name: string
    email: string
  }
  course: {
    title: string
    purchasesProductId: string
  }
  purchasesEnrolledByPurchaseId?: string
}
