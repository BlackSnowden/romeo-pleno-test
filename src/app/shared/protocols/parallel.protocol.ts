type ParallelOptions = {
  options?: {
    executions?: number
    delay?: number
    identifier?: string
  }
  callback: (item: any, identifier: string) => any
  array: any[]
}

export default ParallelOptions
