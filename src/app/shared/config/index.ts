/* eslint-disable import/no-named-default */
import { default as constants } from './constants.config'

const get = (key: string): string | null => {
  switch (true) {
    case !(key in constants):
    case !constants[key]: {
      return null
    }
    default: {
      return String(constants[key])
    }
  }
}

export default { get }
