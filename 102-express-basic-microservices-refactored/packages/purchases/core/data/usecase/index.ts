export interface UseCaseInterface {
  execute(payload: any): Promise<any>
}
