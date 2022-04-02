
export const verificarPrecio = (object: any): boolean => {

  if(!object.hasOwnProperty('Precio') || typeof object.Impuesto !== 'number') {
    return false
  }
  if(!object.hasOwnProperty('Impuesto') || typeof object.Impuesto !== 'number') {
    return false
  }
  return true
}