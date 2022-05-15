/* eslint-disable import/no-named-default */
import { default as constants } from './constants.config'

const get = (key: string): string | null => {
  switch (true) {
    case !(key in constants):
    case !constants[key]: {
      return null
    }
    default: {
      return constants[key] || null
    }
  }
}

export default { get }
