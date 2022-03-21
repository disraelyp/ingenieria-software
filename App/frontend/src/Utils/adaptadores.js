
export const UsuariosAdaptarDG = (item) => {
  return { 'id': item.ID, 'Nombre': item.Nombre, 'Usuario': item.Usuario, 'Role': item.Role }
}

export const ProductosAdaptarDG = (item) => {
  return { 'id': item.ID, 'CodigoBarra': item.CodigoBarra, 'Descripcion': item.Descripcion,  'Categoria': item.Categoria, 'Cantidad': item.Cantidad, 'Precio': '$ ' + item.Precios[0].Precio + item.Precios[0].Impuesto }
}

export const ClientesAdaptarDG = (item) => {
  return { 'id': item.ID, 'Nombre': item.Nombre, 'Cedula': item.Cedula, 'Direccion': item.Direccion }
}

export const ProveedoresAdaptarDG = (item) => {
  return { 'id': item.ID, 'Nombre': item.Nombre, 'RNC': item.RNC, 'Direccion': item.Direccion }
}