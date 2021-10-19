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
    res.json(all)
  } catch (error) {
    next(new InternalServerError())
  }

  // cache logic
  //
}

// export const getPlacesByName = async (req: Request, res: Response) => {
//   const name = req.params.name
//   try {
//   } catch (error) {
//     throw new InternalServerError()
//   }
// }
