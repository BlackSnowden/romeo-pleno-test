import Schema, { SchemaDefinition } from 'validate'
import mongoose from 'mongoose'
import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from 'express'
import { Exception } from '../protocols'

const baseParameters = <SchemaDefinition>{
  limit: {
    type: Number,
  },
  skip: {
    type: Number,
  },
  sort: {
    type: String,
    match: /asc|desc/,
    message: { match: 'Sort must be lowercase asc or desc' },
  },
  sortField: {
    type: String,
  },
}

const validate = (templateSchema: SchemaDefinition) => {
  const middleware = (request: Request, _response: Response, next: NextFunction) => {
    const getFromBodyRequest = ['PATCH', 'PUT', 'POST'].includes(request.method)
    const files = Object.keys(request.files || {}).reduce(
      (_newObj, key) => ({
        ..._newObj,
        [key]: { type: 'file' },
      }),
      {},
    )

    const params = getFromBodyRequest
      ? { ...request.body, ...request.params, ...files }
      : { ...request.query, ...request.params }

    const schema = new Schema({ ...templateSchema, ...(!getFromBodyRequest && baseParameters) })
    schema.typecaster({
      Number: (value) => {
        if (String(Number(value)) !== 'NaN') {
          return Number(value)
        }
        return false
      },
      Object: (value) => value,
      ObjectId: (value) => {
        if (mongoose.Types.ObjectId.isValid(value)) {
          return new mongoose.Types.ObjectId(value)
        }
        return false
      },
    })

    const errors = schema.validate(params, { strict: true, strip: true, typecast: true })
    if (errors.length) {
      const errorsMapped = errors.map((error) => ({
        [error.path.split(/\.\d/).join('')]: error.toString(),
      }))
      const errorsParsed = Object.assign({}, ...errorsMapped)

      throw new Exception('Invalid parameters', StatusCodes.BAD_REQUEST, errorsParsed)
    }

    next()
  }

  return middleware
}

export default validate
