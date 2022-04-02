
export const UsuariosAdaptarDG = (item) => {
  return { 'id': item.ID, 'Nombre': item.Nombre, 'Usuario': item.Usuario, 'Role': item.Role }
}

export const ProductosAdaptarDG = (item) => {
  return { 'id': item.ID, 'CodigoBarra': item.CodigoBarra, 'Descripcion': item.Descripcion,  'Categoria': item.Categoria, 'Cantidad': item.Cantidad, 'Precio': '$ ' + (item.Precios[0].Precio + item.Precios[0].Impuesto), 'Costo' : '$ ' + item.Costo }
}

export const PedidosAdaptarDG = (item) => {
  let total=0
  item.Productos.map(producto => total+= producto.Cantidad * (producto.Datos.Precios.find(precio => precio.Categoria === producto.Categoria).Precio + producto.Datos.Precios.find(precio => precio.Categoria === producto.Categoria).Impuesto))
  return { 'id': item.ID, 'Fecha': item.FechaCreacion.slice(0, 10), 'Vendedor': item.Vendedor,  'Cliente': item.Cliente.Nombre, 'Total': '$ '+total }
}

export const PedidosColumns = [
  { field: 'Fecha', headerName: 'Fecha', width: 150 },
  { field: 'Cliente', headerName: 'Cliente', minWidth: 100, flex: 1  },
  { field: 'Vendedor', headerName: 'Vendedor', minWidth: 50, flex: 1  },
  { field: 'Total', headerName: 'Total', minWidth: 100, flex: 1  },
]

export const ClientesAdaptarDG = (item) => {
  return { 'id': item.ID, 'Nombre': item.Nombre, 'Cedula': item.Cedula, 'Direccion': item.Direccion }
}

export const ProveedoresAdaptarDG = (item) => {
  return { 'id': item.ID, 'Nombre': item.Nombre, 'RNC': item.RNC, 'Direccion': item.Direccion }
}