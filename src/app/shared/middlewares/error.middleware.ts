/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Exception } from '@shared/protocols'
import { loggerService } from '@shared/services'

const errorHandler = (
  error: Exception | Error | SyntaxError,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  if (error instanceof Exception) {
    response.status(error.status).json({
      success: false,
      data: error.data || null,
      message: error.message,
    })
    return
  }

  if (error instanceof SyntaxError) {
    response.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      data: { ...error, expose: undefined, statusCode: undefined, status: undefined, type: undefined },
      message: 'There is a syntax error in your request body',
    })
    return
  }

  loggerService.error(error.message)
  response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    data: null,
    message: 'An internal error has occurred',
  })
}

export default errorHandler
