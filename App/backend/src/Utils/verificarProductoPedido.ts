
export const verificarProductoPedido = (object: any): boolean => {
  if(!object.Producto || typeof object.Producto !== 'number') {
    return false
  }
  if(!object.Cantidad || typeof object.Cantidad !== 'number') {
    return false
  }
  return true
}