import express from 'express'
import { Sequelize } from 'sequelize'
import { checkSchema } from 'express-validator'
import { validateRequest } from '../middlewares/validateRequest'
import { UnprocessableEntityError } from '../errors/unprocessableEntityError'

import UsersResponsibleModel from '../models/user-responsibles'

const router = express.Router()

/**
 * Insert new user responsible
 * @param req {Request|{db: Sequelize}}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const insert = async (req, res) => {
  try {
    const UserResponsible = new UsersResponsibleModel(req.db)
    const userResponsible = await UserResponsible.model.create({
      user_id: req.params.user_id,
      ...req.body
    })
    res.status(201).send(userResponsible)
  } catch (ex) {
    if (ex.name === 'SequelizeUniqueConstraintError') {
      throw new UnprocessableEntityError('Email already registered')
    }
  }
}

/**
 * Get all user responsibles
 * @param req {Request|{db: Sequelize}}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const getAll = async (req, res) => {
  const params = req.query
  const UserResponsible = new UsersResponsibleModel(req.db)

  const result = await UserResponsible.model.findAll({ where: params })
  res.status(200).send(result)
}

/**
 * Get one user responsible
 * @param req {Request|{db: Sequelize}}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const getOne = async (req, res) => {
  const { id, user_id } = req.params

  const UserResponsible = new UsersResponsibleModel(req.db)

  const result = await UserResponsible.model.findOne({ where: { id, user_id } })
  res.status(200).send(result)
}

/**
 * Delete one User Responsible
 * @param req {Request|{db: Sequelize}}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const deleteOne = async (req, res) => {
  const { id, user_id } = req.params

  const UserResponsible = new UsersResponsibleModel(req.db)

  const result = await UserResponsible.model.findOne({ where: { id, user_id } })
  await result.destroy()

  res.status(201).send()
}

/**
 * Update one User Responsible
 * @param req {Request|{db: Sequelize}}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const put = async (req, res) => {
  const { id, user_id } = req.params
  const body = req.body

  const UserResponsible = new UsersResponsibleModel(req.db)

  const result = await UserResponsible.model.findOne({ where: { id, user_id } })
  await result.update(body)
  res.status(201).send(result.dataValues)
}

router.post(
  '/users/:user_id/responsible',
  checkSchema({
    user_id: {
      in: ['path'],
      errorMessage: 'name must be a number',
      isNumeric: true
    },
    name: {
      in: ['body'],
      errorMessage: 'name must be a string',
      isString: true
    },
    email: {
      in: ['body'],
      errorMessage: 'email must be a string',
      isString: true
    },
    mobile: {
      in: ['body'],
      errorMessage: 'mobile must be a string matching ^\(?\d{2}\)?\s?9?\s?\d{4}-?\d{4}$',
      isString: true,
      matches: /^\(?\d{2}\)?\s?9?\s?\d{4}-?\d{4}$/
    },
  }),
  validateRequest,
  insert
)

router.get(
  '/users/:user_id/responsible',
  checkSchema({
    user_id: {
      in: ['path'],
      errorMessage: 'name must be a number',
      isNumeric: true
    },
    name: {
      in: ['query'],
      errorMessage: 'name must be a string',
      isString: true,
      optional: true
    },
    email: {
      in: ['query'],
      errorMessage: 'email must be a string',
      isString: true,
      optional: true
    },
    mobile: {
      in: ['query'],
      errorMessage: 'mobile must be a string matching ^\(?\d{2}\)?\s?9?\s?\d{4}-?\d{4}$',
      isString: true,
      matches: /^\(?\d{2}\)?\s?9?\s?\d{4}-?\d{4}$/,
      optional: true
    },
  }),
  validateRequest,
  getAll
)

router.get(
  '/users/:user_id/responsible/:id',
  checkSchema({
    id: {
      in: ['params'],
      errorMessage: 'id must be a number',
      isNumeric: true
    },
    user_id: {
      in: ['params'],
      errorMessage: 'user_id must be a number',
      isNumeric: true
    }
  }),
  validateRequest,
  getOne
)

router.delete(
  '/users/:user_id/responsible/:id',
  checkSchema({
    id: {
      in: ['params'],
      errorMessage: 'id must be a number',
      isNumeric: true
    },
    user_id: {
      in: ['params'],
      errorMessage: 'user_id must be a number',
      isNumeric: true
    }
  }),
  validateRequest,
  deleteOne
)

router.put(
  '/users/:user_id/responsible/:id',
  checkSchema({
    id: {
      in: ['params'],
      errorMessage: 'id must be a number',
      isNumeric: true
    },
    user_id: {
      in: ['params'],
      errorMessage: 'user_id must be a number',
      isNumeric: true
    },
    name: {
      in: ['body'],
      errorMessage: 'name must be a string',
      isString: true,
      optional: true
    },
    email: {
      in: ['body'],
      errorMessage: 'email must be a string',
      isString: true,
      optional: true
    },
    mobile: {
      in: ['body'],
      errorMessage: 'mobile must be a string matching ^\(?\d{2}\)?\s?9?\s?\d{4}-?\d{4}$',
      isString: true,
      matches: /^\(?\d{2}\)?\s?9?\s?\d{4}-?\d{4}$/,
      optional: true
    },
  }),
  validateRequest,
  put
)

export default router
