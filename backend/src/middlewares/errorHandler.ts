import { Request, Response, NextFunction } from 'express'

import { CustomError } from 'util/error'

const errorHandler = (
  customError: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode, message, error } = customError

  res.status(statusCode).json({
    status: statusCode,
    message: message,
    error: error,
  })
}

export default errorHandler
