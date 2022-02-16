import { Categorias } from 'src/Modules/Precios/Constants/Categoria'

export const verificarPrecio = (object: any): boolean => {
  if(!object.Precio || typeof object.Precio !== 'number') {
    return false
  }
  if(!object.Impuesto || typeof object.Impuesto !== 'number') {
    return false
  }
  if(!object.Categoria  || typeof object.Categoria !== 'string') {
    return false
  }
  if(!Categorias.includes(object.Categoria)){
    return false
  }
  return true
}