export const convert = (hour: string | null | undefined) => {
  const date = new Date().toLocaleDateString().replace(/\//g, '-')
  return Date.parse(`${date} ${hour}`)
}
