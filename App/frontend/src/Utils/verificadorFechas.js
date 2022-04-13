export const verificadorFechas = (inicio1, fin1, inicio2) => {

  const fechaInicioA = new Date(inicio1)
  const fechaFinA = new Date(fin1)

  // sujeto
  const fechaInicioB = new Date(inicio2)

  switch (true) {
  case fechaInicioA <= fechaInicioB && fechaFinA >= fechaInicioB:
    return true
  default:
    return false
  }
}
