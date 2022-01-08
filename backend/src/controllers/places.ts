import { Request, Response, NextFunction } from 'express'

import PlacesService from '../services/places'
import { GetPlacesQuery } from './types'
import { InternalServerError } from '../util/error'

export const getAllPlaces = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, limit } = req.query as unknown as GetPlacesQuery

  try {
    const all = await PlacesService.getAll(page, limit)
    res.locals.data = all
    next()
  } catch (error) {
    next(new InternalServerError())
  }
}

export const getOnePlace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id

  try {
    const place = await PlacesService.getById(id)
    res.locals.data = place
    next()
  } catch (error) {
    next(new InternalServerError())
  }
}
