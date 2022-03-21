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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import InventoryIcon from '@mui/icons-material/Inventory'
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox'
import StorefrontIcon from '@mui/icons-material/Storefront'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

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
    { ID: 1, Text: 'Pedidos', Icon: <ShoppingCartCheckoutIcon />, Link: '/Pedidos' },
    { ID: 2, Text: 'Facturas', Icon: <ShoppingBasketIcon />, Link: '/Facturas' },
    { ID: 3, Text: 'Devoluciones', Icon: <MoneyOffIcon />, Link: '/Devoluciones' },
  ]

  const Inventario = [
    { ID: 1, Text: 'Productos', Icon: <InventoryIcon />, Link: '/Productos' },
    { ID: 2, Text: 'Ordenes de Compras', Icon: <ReceiptLongIcon />, Link: '/Ordenes' },
    { ID: 3, Text: 'Notas de creditos', Icon: <AttachMoneyIcon />, Link: '/Notas' },
  ]

  const Reportes = [
    { ID: 1, Text: 'Ventas', Icon: <AddBusinessIcon /> },
    { ID: 2, Text: 'Compras', Icon: <MoveToInboxIcon /> }
  ]

  return (
    <List>
      <Item text={'Inicio'} icon={ <StorefrontIcon /> }/>
      <Divider />
      <GroupItem text={'Facturacion'} data={Facturacion} icon={ <ShoppingCartIcon /> }/>
      <Item text={'Cuentas por cobrar'} icon={ <PointOfSaleIcon /> }/>
      <Divider />
      <GroupItem text={'Inventario'} data={Inventario}  icon={ <InventoryIcon /> }/>
      <Item text={'Cuentas por pagar'} icon={ <AccountBalanceWalletIcon /> }/>
      <Divider />
      <GroupItem text={'Reportes'} data={Reportes}  icon={ <MenuBookIcon /> }/>
      <Item text={'Usuarios'} icon={ <FaceIcon /> } link={'/Usuarios'}/>
      <Item text={'Proveedores'} icon={ <BusinessIcon /> } link={'/Proveedores'}/>
      <Item text={'Clientes'} icon={ <AccountCircleIcon /> } link={'/Clientes'}/>
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