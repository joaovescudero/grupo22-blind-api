import express from 'express'
import { Sequelize } from 'sequelize'
import { checkSchema } from 'express-validator'
import { validateRequest } from '../middlewares/validateRequest'
import { UnprocessableEntityError } from '../errors/unprocessableEntityError'

import UsersModel from '../models/users'

const router = express.Router()

/**
 * Insert new occurrence
 * @param req {Request|{db: Sequelize}}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const insert = async (req, res) => {
  try {
    const Users = new UsersModel(req.db)
    const user = await Users.model.create(req.body)
    res.status(201).send(user)
  } catch (ex) {
    if (ex.name === 'SequelizeUniqueConstraintError') {
      throw new UnprocessableEntityError('Email already registered')
    }
  }
}

/**
 * Get all occurrences
 * @param req {Request|{db: Sequelize}}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const getAll = async (req, res) => {
  const params = req.query
  const Users = new UsersModel(req.db)

  const result = await Users.model.findAll({ where: params })
  res.status(200).send(result)
}

/**
 * Get one occurrence
 * @param req {Request|{db: Sequelize}}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const getOne = async (req, res) => {
  const { id } = req.params

  const Users = new UsersModel(req.db)

  const result = await Users.model.findByPk(parseInt(id))
  res.status(200).send(result)
}

/**
 * Delete one occurrence
 * @param req {Request|{db: Sequelize}}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const deleteOne = async (req, res) => {
  const { id } = req.params

  const Users = new UsersModel(req.db)

  const result = await Users.model.findByPk(parseInt(id))
  await result.destroy()

  res.status(201).send()
}

/**
 * Update one occurrence
 * @param req {Request|{db: Sequelize}}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const put = async (req, res) => {
  const { id } = req.params
  const body = req.body

  const Users = new UsersModel(req.db)

  const result = await Users.model.findByPk(parseInt(id))
  await result.update(body)
  res.status(201).send(result.dataValues)
}

router.post(
  '/users',
  checkSchema({
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
    password: {
      in: ['body'],
      errorMessage: 'password must be a string',
      isString: true
    },
    document: {
      in: ['body'],
      errorMessage: 'document must be a string matching ^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$',
      isString: true,
      matches: /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/
    },
    birthday: {
      in: ['body'],
      errorMessage: 'birthday must be a date',
      isDate: true
    },
    mobile: {
      in: ['body'],
      errorMessage: 'mobile must be a string matching ^\(?\d{2}\)?\s?9?\s?\d{4}-?\d{4}$',
      isString: true,
      matches: /^\(?\d{2}\)?\s?9?\s?\d{4}-?\d{4}$/
    },
    is_enabled: {
      in: ['body'],
      errorMessage: 'is_enabled must be a boolean',
      isBoolean: true
    }
  }),
  validateRequest,
  insert
)

router.get(
  '/users',
  checkSchema({
    id: {
      in: ['query'],
      errorMessage: 'id must be a number',
      isNumeric: true,
      optional: true
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
    document: {
      in: ['query'],
      errorMessage: 'document must be a string matching ^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$',
      isString: true,
      optional: true,
      matches: /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/
    },
    birthday: {
      in: ['query'],
      errorMessage: 'birthday must be a date',
      isDate: true,
      optional: true
    },
    mobile: {
      in: ['query'],
      errorMessage: 'mobile must be a string matching ^\(?\d{2}\)?\s?9?\s?\d{4}-?\d{4}$',
      isString: true,
      optional: true,
      matches: /^\(?\d{2}\)?\s?9?\s?\d{4}-?\d{4}$/
    },
    is_enabled: {
      in: ['query'],
      errorMessage: 'is_enabled must be a boolean',
      isBoolean: true,
      optional: true
    }
  }),
  validateRequest,
  getAll
)

router.get(
  '/users/:id',
  checkSchema({
    id: {
      in: ['params'],
      errorMessage: 'id must be a number',
      isNumeric: true
    }
  }),
  validateRequest,
  getOne
)

router.delete(
  '/users/:id',
  checkSchema({
    id: {
      in: ['params'],
      errorMessage: 'id must be a number',
      isNumeric: true
    }
  }),
  validateRequest,
  deleteOne
)

router.put(
  '/users/:id',
  checkSchema({
    id: {
      in: ['params'],
      errorMessage: 'id must be a number',
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
    password: {
      in: ['body'],
      errorMessage: 'password must be a string',
      isString: true,
      optional: true
    },
    document: {
      in: ['body'],
      errorMessage: 'document must be a string matching ^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$',
      isString: true,
      matches: /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/,
      optional: true
    },
    birthday: {
      in: ['body'],
      errorMessage: 'birthday must be a date',
      isDate: true,
      optional: true
    },
    mobile: {
      in: ['body'],
      errorMessage: 'mobile must be a string matching ^\(?\d{2}\)?\s?9?\s?\d{4}-?\d{4}$',
      isString: true,
      matches: /^\(?\d{2}\)?\s?9?\s?\d{4}-?\d{4}$/,
      optional: true
    },
    is_enabled: {
      in: ['body'],
      errorMessage: 'is_enabled must be a boolean',
      isBoolean: true,
      optional: true
    }
  }),
  validateRequest,
  put
)

export default router
