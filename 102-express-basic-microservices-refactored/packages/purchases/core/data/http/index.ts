export type HttpRequest<T> = {
  body: T
}

export type HttpSend<T> = {
  (payload?: T): void
}

export type HttpResponseJson = {
  (payload?: any): void
}

export type HttpResponseStatus<T> = {
  send: HttpSend<T>
  end: Function
  json: HttpResponseJson
}

export type HttpStatus<T> = {
  (statusCode: number): HttpResponseStatus<T>
}

export type HttpResponse<T> = {
  status: HttpStatus<T>
}
