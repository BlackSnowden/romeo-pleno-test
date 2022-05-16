class Exception {
  constructor(public message: string, public status: number, public data?: string | number | Record<string, never>) {}
}

export default Exception
