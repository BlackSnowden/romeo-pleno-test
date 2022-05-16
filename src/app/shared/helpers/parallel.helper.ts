import { ParallelOptions } from '@shared/protocols'
import { chunks } from '@shared/utils'
import { get } from 'lodash'
import sleep from './sleep.helper'

export default async ({ array, callback, options }: ParallelOptions) => {
  const { executions = 2, delay = 300, identifier = 'id' } = options || {}

  const itemsPerExecutions = chunks(array, array.length / executions)
  for (const chunk of itemsPerExecutions) {
    const promises: Promise<any>[] = []

    chunk.forEach((item) =>
      promises.push(
        new Promise((resolve) => {
          resolve(callback(item, get(item, identifier)))
        }),
      ),
    )

    await Promise.all(promises)
    await sleep(delay)
  }
}
