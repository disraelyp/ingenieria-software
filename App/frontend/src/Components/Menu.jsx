import React, { useState } from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Divider } from '@mui/material'
import { logout } from './../Reducers/loginReducer'
import storage from './../Utils/loginLocalStorage'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import LogoutIcon from '@mui/icons-material/Logout'
import FaceIcon from '@mui/icons-material/Face'
import BusinessIcon from '@mui/icons-material/Business'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import InventoryIcon from '@mui/icons-material/Inventory'
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PaidIcon from '@mui/icons-material/Paid'
import NoteIcon from '@mui/icons-material/Note'


const Item = ({ text, icon, link }) => {

  const history = useHistory()

  return (
    <ListItemButton onClick={() => history.push(link)} >
      <ListItemIcon>
        { icon }
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  )
}



const GroupItem = ({ text, icon, data }) => {

  const [open, setOpen] = useState(false)

  const history = useHistory()

  return (
    <>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemIcon>
          { icon }
        </ListItemIcon>
        <ListItemText primary={ text } />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout='auto' unmountOnExit>
        { data.map(item =>
          <List key={item.ID} onClick={() => history.push(item.Link)} component='div' disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                { item.Icon }
              </ListItemIcon>
              <ListItemText primary={ item.Text } />
            </ListItemButton>
          </List>
        )}
      </Collapse>

    </>
  )
}


const Menu = () => {

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    storage.logoutUser()
  }

  const Facturacion = [
    { ID: 1, Text: 'Pedidos', Icon: <ShoppingCartCheckoutIcon />, Link: '/Facturacion/Pedidos' },
    { ID: 2, Text: 'Devoluciones', Icon: <MoneyOffIcon />, Link: '/Facturacion/Devoluciones' },
  ]

  const CuentasCliente = [
    { ID: 1, Text: 'Notas de credito', Icon: <NoteIcon />, Link: '/CuentasClientes/Notas' },
    { ID: 2, Text: 'Cuentas por cobrar', Icon: <PointOfSaleIcon />, Link: '/CuentasClientes/Cuentas' },
    { ID: 3, Text: 'Historial de cobros', Icon: <PaidIcon />, Link: '/CuentasClientes/Historial' },
  ]

  const CuentasProveedores = [
    { ID: 1, Text: 'Cuentas por pagar', Icon: <PaidIcon />, Link: '/CuentasProveedores/Cuentas' },
    { ID: 2, Text: 'Historial de pagos', Icon: <PointOfSaleIcon />, Link: '/CuentasProveedores/Historial' },
  ]

  const Inventario = [
    { ID: 1, Text: 'Productos', Icon: <InventoryIcon />, Link: '/Inventario/Productos' },
    { ID: 2, Text: 'Ordenes de Compras', Icon: <ReceiptLongIcon />, Link: '/Inventario/Compras' },
    { ID: 3, Text: 'Notas de debito', Icon: <AttachMoneyIcon />, Link: '/Inventario/Notas' },
  ]

  const Reportes = [
    { ID: 1, Text: 'Ventas x Cliente', Icon: <AddBusinessIcon />, Link: '/Reportes/VentasCliente' },
    { ID: 3, Text: 'Compras x Proveedor', Icon: <AddBusinessIcon />, Link: '/Reportes/ComprasProveedor' },
  ]


  const user = (useSelector(state => state.user)).user.Role

  return (
    <List>
      <Divider />
      { user !== 'Almacenista' ? <GroupItem text={'Facturacion'} data={Facturacion} icon={ <ShoppingCartIcon /> }/> : null}
      { user !== 'Almacenista' ? <GroupItem text={'Cuentas por cobrar'} data={CuentasCliente} icon={ <PointOfSaleIcon /> }/> : null}
      <Divider />
      { user !== 'Cajera' ? <GroupItem text={'Inventario'} data={Inventario}  icon={ <InventoryIcon /> }/> : null}
      { user !== 'Cajera' ? <GroupItem text={'Cuentas por pagar'} data={CuentasProveedores} icon={ <AccountBalanceWalletIcon /> }/> : null}
      <Divider />
      { user === 'Administrador' ? <GroupItem text={'Reportes'} data={Reportes}  icon={ <MenuBookIcon /> }/> : null}
      { user === 'Administrador' ? <Item text={'Usuarios'} icon={ <FaceIcon /> } link={'/Usuarios'}/> : null}
      { user === 'Administrador' ? <Item text={'Proveedores'} icon={ <BusinessIcon /> } link={'/Proveedores'}/> : null}
      { user === 'Administrador' ? <Item text={'Clientes'} icon={ <AccountCircleIcon /> } link={'/Clientes'}/> : null}
      <Divider />
      <ListItemButton onClick={() => handleLogout()} >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary='Cerrar Seccion' />
      </ListItemButton>
    </List>
  )
}

export default Menu