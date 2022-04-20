import { MessageAdapterInterface } from '../../data/adapter/message-adapter'

export class MessageAdapter implements MessageAdapterInterface {
  constructor(private messageAdapter: MessageAdapterInterface) {}

  async execute(fn: Function, payload: any) {
    return this.messageAdapter.execute(fn, payload)
  }
}
