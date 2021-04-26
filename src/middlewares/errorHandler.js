// eslint-disable-next-line
import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../errors/customError'

/**
 * Handle express routes error
 * @param err {Error}
 * @param req {Request}
 * @param res {Response}
 * @param next {NextFunction}
 * @returns {*}
 */
export const errorHandler = (
  err,
  req,
  res,
  // eslint-disable-next-line
  next
) => {
  console.log(err)
  if (err instanceof CustomError) {
    return res.status(err.statusCode)
      .send({ errors: err.serializeErrors() })
  }

  res.status(400)
    .send({
      errors: [{ message: 'Something went wrong' }]
    })
}
