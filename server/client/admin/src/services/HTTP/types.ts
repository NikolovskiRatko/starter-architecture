export type HTTPMethods = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT'

interface QueryStringParameters {
  [key: string]: string
}

export interface HandlerOptions {
  method: HTTPMethods
  params?: QueryStringParameters
  onAbort?: Function
  hasToFormatFailedRequest?: boolean
}

export interface RequestTypeOptions {
  onAbort?: Function
  hasToFormatFailedRequest?: boolean
}

interface PromiseErrorReturn {
  error: any
  message: string
}

interface PromiseReturn {
  success: boolean
  data?: any
  status?: number
  error?: PromiseErrorReturn
  message?: string
}

export type HandlerRequest = (url: string, options: HandlerOptions, data?: any ) => Promise<PromiseReturn>
export type RequestType = (url: string, data?: any, options?: RequestTypeOptions) => Promise<PromiseReturn>
