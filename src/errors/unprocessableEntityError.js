// eslint-disable-next-line
import { ValidationError } from 'express-validator'
import { CustomError } from './customError'

/**
 * Return a Request Validation Error
 */
class UnprocessableEntityError extends CustomError {
  /**
   * @type {number}
   */
  statusCode = 422

  /**
   * @type {string}
   */
  message = null

  /**
   * @param message {string}
   */
  constructor(message) {
    super(message)
    this.message = message
  }

  serializeErrors() {
    return [{ message: this.message }]
  }
}

export {
  UnprocessableEntityError
}
