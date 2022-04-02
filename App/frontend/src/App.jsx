import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from './Reducers/loginReducer'
import storage from './Utils/loginLocalStorage'
import { initializeUsuarios } from './Reducers/usuariosReducer'
import { initializeProductos } from './Reducers/productosReducer'
import { initializeClientes } from './Reducers/clientesReducer'
import { initializeProveedores } from './Reducers/proveedoresReducer'
import { AppBar, Container, Box, CssBaseline, Drawer, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Menu from './Components/Menu'
import NotificacionPanel from './Components/Utils/NotificationPanel'
import LoginForm from './Components/Utils/LoginForm'
import WelcomePage from './Components/Utils/WelcomePage'

import { Cliente, Clientes, ClienteCreate, ClienteUpdate } from './Components/Modules/Clientes'
import { Producto, Productos, ProductoCreate, ProductoUpdate } from './Components/Modules/Productos'
import { Proveedor, Proveedores, ProveedorCreate, ProveedorUpdate } from './Components/Modules/Proveedores'
import { Usuario, Usuarios, UsuarioCreate, UsuarioUpdate } from './Components/Modules/Usuarios'

import { Pedidos, PedidoCreate } from './Components/Modules/Pedidos'
import { initializePedidos } from './Reducers/pedidosReducer'

const App = (props) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const notificaciones = useSelector(state => state.notificaciones)
  const titulo = useSelector(state => state.titulo)

  useEffect(() => {
    dispatch(initializeUsuarios())
    dispatch(initializeProductos())
    dispatch(initializePedidos())
    dispatch(initializeProveedores())
    dispatch(initializeClientes())
    const user = storage.loadUser()
    if (user) {
      dispatch(login(user))
    }
  }, [dispatch])

  const { window } = props
  const [mobileOpen, setMobileOpen] = useState(false)
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)
  const container = window !== undefined ? () => window().document.body : undefined

  if (!user) {
    return (
      <Container>
        <LoginForm />
      </Container>
    )
  }

  return (
    <>
      { notificaciones !== null ? <NotificacionPanel notificaciones={notificaciones} /> : null }
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${250}px)` }, ml: { sm: `${250}px` }, }} >
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              { titulo }
            </Typography>
          </Toolbar>
        </AppBar>
        <Box component="nav" sx={{ width: { sm: 250 }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
          <Drawer container={container} variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true, }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 }, }}>
            <Toolbar />
            <Menu />
          </Drawer>
          <Drawer variant="permanent" sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 }, }} open>
            <Toolbar />
            <Menu />
          </Drawer>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${250}px)` } }} >
          <Toolbar />
          <Switch>
            <Route exact path='/'>
              <WelcomePage />
            </Route>
            <Route exact path='/Clientes'>
              <Clientes />
            </Route>
            <Route exact path='/Clientes/Crear'>
              <ClienteCreate />
            </Route>
            <Route exact path='/Clientes/Ver/:id'>
              <Cliente />
            </Route>
            <Route exact path='/Clientes/Editar/:id'>
              <ClienteUpdate />
            </Route>


            <Route exact path='/Inventario/Productos'>
              <Productos />
            </Route>
            <Route exact path='/Inventario/Productos/Crear'>
              <ProductoCreate />
            </Route>
            <Route exact path='/Inventario/Productos/Ver/:id'>
              <Producto />
            </Route>
            <Route exact path='/Inventario/Productos/Editar/:id'>
              <ProductoUpdate />
            </Route>

            <Route exact path='/Proveedores'>
              <Proveedores />
            </Route>
            <Route exact path='/Proveedores/Crear'>
              <ProveedorCreate />
            </Route>
            <Route exact path='/Proveedores/Ver/:id'>
              <Proveedor />
            </Route>
            <Route exact path='/Proveedores/Editar/:id'>
              <ProveedorUpdate />
            </Route>

            <Route exact path='/Usuarios'>
              <Usuarios />
            </Route>
            <Route exact path='/Usuarios/Crear'>
              <UsuarioCreate />
            </Route>
            <Route exact path='/Usuarios/Ver/:id'>
              <Usuario />
            </Route>
            <Route exact path='/Usuarios/Editar/:id'>
              <UsuarioUpdate />
            </Route>

            <Route exact path='/Facturacion/Pedidos/Crear'>
              <PedidoCreate />
            </Route>
            <Route exact path='/Facturacion/Pedidos'>
              <Pedidos />
            </Route>
          </Switch>
        </Box>
      </Box>
    </>
  )
}

export default App