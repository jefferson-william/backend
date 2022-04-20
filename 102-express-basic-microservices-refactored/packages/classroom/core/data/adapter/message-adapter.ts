export interface MessageAdapterInterface {
  execute(fn: Function, payload: any): Promise<void>
}
