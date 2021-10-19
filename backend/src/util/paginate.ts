const paginate = <T>(page: number, limit: number, data: T[]): T[] => {
  const skip = (page - 1) * limit
  return [...data].splice(skip, limit)
}

export default paginate
