import { Request } from 'express'

export const createCacheKey = (req: Request) => {
  const params = req.params
  const query = req.query
  const path = req.path

  let paramsStringify = ''
  let queryStringify = ''

  if (Object.keys(params).length > 0) {
    paramsStringify = Object.values(params).reduce(
      (acc, next) => acc + '-' + next
    )
  }

  if (Object.keys(query).length > 0) {
    queryStringify = Object.values(query).reduce(
      (acc, next) => (acc?.toString() ?? '') + '-' + (next?.toString() ?? '')
    ) as string
  }

  const cacheKey = path + paramsStringify + queryStringify

  return cacheKey
}
