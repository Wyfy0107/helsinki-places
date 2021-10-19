export const convert = (hour: string | null | undefined) => {
  const date = new Date().toLocaleDateString('en-US').replace(/\//g, '-')
  return `${date} ${hour}`
}
