import axios from 'axios'
import { RequestOptions } from '@shared/protocols'

const get = async ({ url, options }: RequestOptions) => {
  const { success, data } = await axios
    .get(url, {
      ...(options?.headers && { headers: options.headers }),
    })
    .then((response) => ({ success: true, data: response.data }))
    .catch((error) => ({ success: false, data: error.response.data }))

  return { success, data }
}

export default { get }
