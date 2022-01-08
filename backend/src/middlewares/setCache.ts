import { Request, Response, NextFunction } from 'express'

import { createCacheKey } from '../util'
import { client } from '../redis'
import { InternalServerError } from '../util/error'

const setCache = async (req: Request, res: Response, next: NextFunction) => {
  const data = res.locals.data

  if (!data) {
    throw new InternalServerError()
  }

  res.json(data)

  const cacheKey = createCacheKey(req)
  await client.set(cacheKey, JSON.stringify(data), 'EX', 3600)
}

export default setCache
