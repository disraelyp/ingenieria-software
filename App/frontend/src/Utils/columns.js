
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

export const PedidosColumns = [
  { field: 'Fecha', headerName: 'Fecha', width: 150 },
  { field: 'Cliente', headerName: 'Cliente', minWidth: 100, flex: 1  },
  { field: 'Vendedor', headerName: 'Vendedor', minWidth: 50, flex: 1  },
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

export const PedidoCreateColumns = [
  { field: 'Codigo', headerName: 'Codigo', width: 150 },
  { field: 'Descripcion', headerName: 'Descripcion', minWidth: 100, flex: 1  },
  { field: 'Cantidad', headerName: 'Cantidad', minWidth: 100, flex: 1  },
  { field: 'Precio', headerName: 'Precio', minWidth: 100, flex: 1  },
  { field: 'Impuesto', headerName: 'Impuesto', minWidth: 50, flex: 1  },
  { field: 'Total', headerName: 'Total', minWidth: 100, flex: 1  },
]