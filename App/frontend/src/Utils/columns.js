
export const UsuarioColumns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'Nombre', headerName: 'Nombre', minWidth: 100, flex: 1  },
  { field: 'Usuario', headerName: 'Usuario', minWidth: 100, flex: 1  },
  { field: 'Role', headerName: 'Rol', minWidth: 100, flex: 1  },
]

export const ProductoColumns = [
  { field: 'CodigoBarra', headerName: 'Codigo Barra', width: 150 },
  { field: 'Descripcion', headerName: 'Descripcion', minWidth: 100, flex: 1  },
  { field: 'Cantidad', headerName: 'Cantidad', minWidth: 50, flex: 1  },
  { field: 'Categoria', headerName: 'Categoria', minWidth: 100, flex: 1  },
  { field: 'Precio', headerName: 'Precio', minWidth: 100, flex: 1  },
  { field: 'Costo', headerName: 'Costo', minWidth: 100, flex: 1  },
]

export const ProductoModalColumns = [
  { field: 'CodigoBarra', headerName: 'Codigo Barra', width: 150 },
  { field: 'Descripcion', headerName: 'Descripcion', minWidth: 100, flex: 1  },
  { field: 'Cantidad', headerName: 'Cantidad', minWidth: 50, flex: 1  },
  { field: 'Categoria', headerName: 'Categoria', minWidth: 100, flex: 1  },
  { field: 'Precio', headerName: 'Precio', minWidth: 100, flex: 1  },
]

export const ProductoCompraModalColumns = [
  { field: 'CodigoBarra', headerName: 'Codigo Barra', width: 150 },
  { field: 'Descripcion', headerName: 'Descripcion', minWidth: 100, flex: 1  },
  { field: 'Cantidad', headerName: 'Cantidad', minWidth: 50, flex: 1  },
  { field: 'Categoria', headerName: 'Categoria', minWidth: 100, flex: 1  },
  { field: 'Costo', headerName: 'Costo', minWidth: 100, flex: 1  },
]

export const PedidosColumns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'Fecha', headerName: 'Fecha', width: 150 },
  { field: 'UltimaModificacion', headerName: 'Ultima Mod.', width: 150 },
  { field: 'Etapa', headerName: 'Etapa', minWidth: 100, flex: 1  },
  { field: 'Cliente', headerName: 'Cliente', minWidth: 100, flex: 1  },
  { field: 'Estado', headerName: 'Estado', minWidth: 100, flex: 1  },
  { field: 'Vendedor', headerName: 'Vendedor', minWidth: 50, flex: 1  },
  { field: 'Total', headerName: 'Total', minWidth: 100, flex: 1  },
]

export const DevolucionesColumns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'Fecha', headerName: 'Fecha', width: 150 },
  { field: 'Cliente', headerName: 'Cliente', minWidth: 100, flex: 1  },
  { field: 'Estado', headerName: 'Estado', minWidth: 100, flex: 1  },
  { field: 'Vendedor', headerName: 'Vendedor', minWidth: 50, flex: 1  },
  { field: 'Total', headerName: 'Total', minWidth: 100, flex: 1  },
]

export const ComprasColumns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'Fecha', headerName: 'Fecha', width: 150 },
  { field: 'Comprador', headerName: 'Comprador', minWidth: 100, flex: 1  },
  { field: 'Termino', headerName: 'Termino', minWidth: 100, flex: 1  },
  { field: 'Estado', headerName: 'Estado', minWidth: 100, flex: 1  },
  { field: 'Proveedor', headerName: 'Proveedor', minWidth: 50, flex: 1  },
  { field: 'Total', headerName: 'Total', minWidth: 100, flex: 1  },
]

export const ProveedorColumns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'Nombre', headerName: 'Nombre', minWidth: 100, flex: 1  },
  { field: 'RNC', headerName: 'RNC', minWidth: 50, flex: 1  },
  { field: 'Direccion', headerName: 'Direccion', minWidth: 100, flex: 1  },
]

export const ClienteColumns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'Nombre', headerName: 'Nombre', minWidth: 100, flex: 1  },
  { field: 'Cedula', headerName: 'Cedula', minWidth: 50, flex: 1  },
  { field: 'Direccion', headerName: 'Direccion', minWidth: 100, flex: 1  },
]

export const HistorialColumns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'Fecha', headerName: 'Fecha', width: 150 },
  { field: 'Descripcion', headerName: 'Descripcion', minWidth: 100, flex: 1  },
  { field: 'Cliente', headerName: 'Cliente', minWidth: 100, flex: 1  },
  { field: 'SaldoPagado', headerName: 'Saldo Pagado', minWidth: 50, flex: 1  },
  { field: 'Cobrador', headerName: 'Cobrador', minWidth: 100, flex: 1  },
]

export const CuentasColumns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'Fecha', headerName: 'Fecha', width: 150 },
  { field: 'Descripcion', headerName: 'Descripcion', minWidth: 100, flex: 1  },
  { field: 'Cliente', headerName: 'Cliente', minWidth: 100, flex: 1  },
  { field: 'SaldoPendiente', headerName: 'Saldo Pendiente', minWidth: 50, flex: 1  },
  { field: 'SaldoPagado', headerName: 'Saldo Pagado', minWidth: 50, flex: 1  },
  { field: 'Cobrador', headerName: 'Cobrador', minWidth: 100, flex: 1  },
]

export const PedidoCreateColumns = [
  { field: 'Codigo', headerName: 'Codigo', width: 150 },
  { field: 'Descripcion', headerName: 'Descripcion', minWidth: 100, flex: 1  },
  { field: 'Cantidad', headerName: 'Cantidad', minWidth: 100, flex: 1  },
  { field: 'Precio', headerName: 'Precio', minWidth: 100, flex: 1  },
  { field: 'Impuesto', headerName: 'Impuesto', minWidth: 50, flex: 1  },
  { field: 'Total', headerName: 'Total', minWidth: 100, flex: 1  },
]

export const CompraCreateColumns = [
  { field: 'Codigo', headerName: 'Codigo', width: 150 },
  { field: 'Descripcion', headerName: 'Descripcion', minWidth: 100, flex: 1  },
  { field: 'Cantidad', headerName: 'Cantidad', minWidth: 100, flex: 1  },
  { field: 'Costo', headerName: 'Costo', minWidth: 100, flex: 1  },
  { field: 'Total', headerName: 'Total', minWidth: 100, flex: 1  },
]