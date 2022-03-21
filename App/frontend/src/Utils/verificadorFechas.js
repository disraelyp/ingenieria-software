export const verificadorFechas = (inicio1, fin1, inicio2, fin2) => {

  const fechaInicioA = new Date(inicio1)
  const fechaFinA = new Date(fin1)
  const fechaInicioB = new Date(inicio2)
  const fechaFinB = new Date(fin2)

  switch (true) {
  case fechaInicioA > fechaFinA:
    return false
  case fechaInicioA === fechaInicioB:
    return false
  case fechaFinA === fechaFinB:
    return false
  case fechaInicioA > fechaFinB && fechaFinA > fechaFinB:
    return true
  case fechaInicioA < fechaInicioB && fechaFinA < fechaInicioB:
    return true
  default:
    return false
  }
}
