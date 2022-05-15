import path from 'path'
import fs from 'fs'
import config from '@config'

export default async (_filepath: string, content: string) =>
  new Promise((resolve) => {
    const rootDir = config.get('root_dir') || '../../'
    const paths = path.resolve(`${rootDir}/${_filepath}`).replace(/\/\//, '/').split('/')
    const filePath = [...paths].slice(0, paths.length - 1).join('/')

    const writeFileCallback = (error: NodeJS.ErrnoException | null) => {
      if (error) throw error

      resolve(true)
    }

    if (fs.existsSync(filePath)) {
      fs.writeFile(paths.join('/'), content, { encoding: 'utf-8' }, writeFileCallback)
      return
    }

    fs.mkdir(filePath, { recursive: true }, (error) => {
      if (error) throw error

      fs.writeFile(paths.join('/'), content, { encoding: 'utf-8' }, writeFileCallback)
    })
  })
