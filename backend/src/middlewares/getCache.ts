import { Request, Response, NextFunction } from 'express'

import { createCacheKey } from '../util'
import { client } from '../redis'

export const getCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cacheKey = createCacheKey(req)
  const cache = await client.get(cacheKey)

  if (cache) {
    return res.json(JSON.parse(cache))
  }

  next()
}

export default getCache
