export class CustomError extends Error {
  constructor(
    readonly statusCode: number,
    readonly message: string,
    readonly error?: Error
  ) {
    super()
  }
}

export class NotFoundError extends CustomError {
  constructor(
    readonly message = 'Resource not found',
    readonly statusCode = 404,
    readonly error?: Error
  ) {
    super(statusCode, message, error)
  }
}

export class InternalServerError extends CustomError {
  constructor(
    readonly message = 'Internal server error',
    readonly statusCode = 500,
    readonly error?: Error
  ) {
    super(statusCode, message, error)
  }
}
