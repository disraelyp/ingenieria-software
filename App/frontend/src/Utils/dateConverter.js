export const dateConverter = (value) => {
  const fecha = new Date(value)
  return fecha.getUTCFullYear()+'-'+(fecha.getUTCMonth()+1)+'-'+fecha.getDate()
}