import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import loginReducer from './Reducers/loginReducer'
import notificacionReducer from './Reducers/notificacionesReducer'
import usuarioReducer from './Reducers/usuariosReducer'
import tituloReducer from './Reducers/tituloReducer'
import productosReducer from './Reducers/productosReducer'
import pedidosReducer from './Reducers/pedidosReducer'
import proveedoresReducer from './Reducers/proveedoresReducer'
import clientesReducer from './Reducers/clientesReducer'
import historialPagosReducer from './Reducers/historialPagos'
import devolucionesReducer from './Reducers/devolucionesReducer'
import comprasReducer from './Reducers/comprasReducer'

const reducer = combineReducers({
  user: loginReducer,
  devoluciones: devolucionesReducer,
  compras: comprasReducer,
  historialPagos: historialPagosReducer,
  notificaciones: notificacionReducer,
  productos: productosReducer,
  pedidos: pedidosReducer,
  proveedores: proveedoresReducer,
  clientes: clientesReducer,
  usuarios: usuarioReducer,
  titulo: tituloReducer,
})

export default createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))