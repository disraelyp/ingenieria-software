/* eslint-disable react/react-in-jsx-scope */

import PersonIcon from '@mui/icons-material/Person'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import InventoryIcon from '@mui/icons-material/Inventory'
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import NewspaperIcon from '@mui/icons-material/Newspaper'

export const roleUsuario =[
  { label: 'Administrador', value: 1 },
  { label: 'Cajera', value: 2 },
  { label: 'Almacenista', value: 3 },
]

export const impuestos =[
  { label: '18%', value: 18 },
  { label: '16%', value: 16 },
]

export const origenProducto = [
  { label: 'Nacional', value: 1 },
  { label: 'Importacion', value: 2 },
]

export const categoriaProducto = [
  { label: 'Golosinas', value: 1 },
  { label: 'Lacteos', value: 2 },
  { label: 'Enlatados', value: 3 },
  { label: 'Higiene', value: 4 },
  { label: 'Limpieza', value: 5 },
  { label: 'Pastas', value: 6 },
  { label: 'Bebidas Alcoholicas', value: 7 },
  { label: 'Bebidas no Alcoholicas', value: 8 },
]

export const  MenuOptionsUsuarios =  [
  { id: 1, text: 'Usuarios', icon: <PersonIcon />, link: '/Usuarios' , activo: true, },
  { id: 2, text: 'Volver', icon: <ArrowBackIcon />, link: '/' , activo: true, },
]
export const  MenuOptionsClientes =  [
  { id: 1, text: 'Clientes', icon: <PersonIcon />, link: '/Clientes' , activo: true, },
  { id: 2, text: 'Volver', icon: <ArrowBackIcon />, link: '/' , activo: true, },
]
export const  MenuOptionsProveedores =  [
  { id: 1, text: 'Proveedores', icon: <PersonIcon />, link: '/Proveedores' , activo: true, },
  { id: 2, text: 'Volver', icon: <ArrowBackIcon />, link: '/' , activo: true, },
]


export const  MenuOptionsInventario =  [
  { id: 1, text: 'Productos', icon: <InventoryIcon />, link: '/Inventario' , activo: true, },
  { id: 2, text: 'Compras', icon: <ShoppingBagIcon />, link: '/' , activo: true, },
  { id: 3, text: 'Devoluciones', icon: <AssignmentReturnIcon />, link: '/' , activo: true, },
  { id: 4, text: 'Reportes', icon: <NewspaperIcon />, link: '/' , activo: true, },
  { id: 5, text: 'Volver', icon: <ArrowBackIcon />, link: '/' , activo: true, },
]