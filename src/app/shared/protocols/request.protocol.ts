type RequestOptions = {
  url: string
  body?: { [x: string]: any }
  options?: {
    headers?: { [x: string]: string }
  }
}

export default RequestOptions
