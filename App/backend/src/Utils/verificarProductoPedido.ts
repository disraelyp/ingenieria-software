import { Categorias } from 'src/Modules/Precios/Constants/Categoria'

export const verificarProductoPedido = (object: any): boolean => {
  if(!object.Producto || typeof object.Producto !== 'number') {
    return false
  }
  if(!object.Cantidad || typeof object.Cantidad !== 'number') {
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