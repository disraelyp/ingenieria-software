
export const clientesAdapterSI = (item) => {
  return { label: item.Nombre + ' (CEDULA: ' + item.Cedula + ')', value: item.ID }
}

export const proveedoresAdapterSI = (item) => {

  return { label: item.Nombre + ' (RND: ' + item.RNC + ')', value: item.ID }
}


export const UsuariosAdaptarDG = (item) => {
  return { 'id': item.ID, 'Nombre': item.Nombre, 'Usuario': item.Usuario, 'Role': item.Role }
}

export const ProductosAdaptarDG = (item) => {
  return { 'id': item.ID, 'CodigoBarra': item.CodigoBarra, 'Descripcion': item.Descripcion,  'Categoria': item.Categoria, 'Cantidad': item.Cantidad, 'Precio': '$ ' + (item.Precios[0].Precio + item.Precios[0].Impuesto), 'Costo' : '$ ' + item.Costo }
}

export const PedidosAdaptarDG = (item) => {
  let total = 0
  item.Productos.map(producto => total += producto.Cantidad * (producto.Precio + producto.Impuesto))
  return { 'id': item.ID, 'Fecha': (item.FechaCreacion).slice(0, 10), 'Estado': item.Pagado ? 'Pagado' : 'Pendiente', 'UltimaModificacion': item.FechaModificacion.slice(0, 10), 'Vendedor': item.Vendedor,  'Cliente': item.Cliente.Nombre, 'Etapa': item.Estado, 'Total': '$ '+total }
}

export const ComprasAdaptarDG = (item) => {
  let total = 0
  item.Productos.map(producto => total += producto.Cantidad * producto.Costo)
  return { 'id': item.ID, 'Termino': item.Termino, 'Fecha': (item.FechaCreacion).slice(0, 10), 'Estado': item.Pagado ? 'Pagado' : 'Pendiente', 'Comprador': item.Comprador,  'Proveedor': item.Proveedor.Nombre, 'Total': '$ '+total }
}

export const DevolucionesAdaptarDG = (item) => {
  let total = 0
  item.Productos.map(producto => total += producto.Cantidad * (producto.Precio + producto.Impuesto))
  return { 'id': item.ID, 'Fecha': (item.FechaCreacion).slice(0, 10), 'Estado': item.Pagado ? 'Pagado' : 'Pendiente', 'Vendedor': item.Vendedor,  'Cliente': item.Cliente.Nombre, 'Total': '$ '+total }
}

export const ClientesAdaptarDG = (item) => {
  return { 'id': item.ID, 'Nombre': item.Nombre, 'Cedula': item.Cedula, 'Direccion': item.Direccion }
}

export const HistorialesAdaptarDG = (item) => {
  return { 'id': item.ID, 'Fecha': item.Fecha.slice(0, 10), 'Descripcion': item.Descripcion, 'Cliente': item.Cliente.Nombre, 'SaldoPagado': item.SaldoPagado, 'Cobrador': item.Vendedor }
}

export const CuentasAdaptarDG = (item) => {
  return { 'id': item.ID, 'Fecha': item.Fecha.slice(0, 10), 'Descripcion': item.Descripcion, 'Cliente': item.Cliente.Nombre, 'SaldoPagado': item.SaldoPagado, 'SaldoPendiente': item.SaldoPendiente, 'Cobrador': item.Vendedor }
}

export const ProveedoresAdaptarDG = (item) => {
  return { 'id': item.ID, 'Nombre': item.Nombre, 'RNC': item.RNC, 'Direccion': item.Direccion }
}