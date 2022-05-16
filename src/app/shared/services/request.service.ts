import axios from 'axios'
import { RequestOptions } from '@shared/protocols'

const get = async ({ url, options }: RequestOptions) => {
  const { success, data } = await axios
    .get(url, {
      ...(options?.headers && { headers: options.headers }),
    })
    .then((response) => ({ success: true, data: response.data }))
    .catch((error) => {
      if (!error.response) {
        return { success: false, data: error.message }
      }

      return { success: false, data: error.response.data }
    })

  return { success, data }
}

const post = async ({ url, body, options }: RequestOptions) => {
  const { success, data } = await axios
    .post(url, (body && body) || {}, {
      ...(options?.headers && { headers: options.headers }),
    })
    .then((response) => ({ success: true, data: response.data }))
    .catch((error) => {
      if (!error.response) {
        return { success: false, data: error.message }
      }

      return { success: false, data: error.response.data }
    })

  return { success, data }
}

const put = async ({ url, body, options }: RequestOptions) => {
  const { success, data } = await axios
    .put(url, (body && body) || {}, {
      ...(options?.headers && { headers: options.headers }),
    })
    .then((response) => ({ success: true, data: response.data }))
    .catch((error) => {
      if (!error.response) {
        return { success: false, data: error.message }
      }

      return { success: false, data: error.response.data }
    })

  return { success, data }
}

const del = async ({ url, body, options }: RequestOptions) => {
  const { success, data } = await axios
    .delete(url, {
      ...(options?.headers && { headers: options.headers }),
      data: body,
    })
    .then((response) => ({ success: true, data: response.data }))
    .catch((error) => {
      if (!error.response) {
        return { success: false, data: error.message }
      }

      return { success: false, data: error.response.data }
    })

  return { success, data }
}

export default { get, post, put, del }
