import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import loginReducer from './Reducers/loginReducer'
import notificacionReducer from './Reducers/notificacionesReducer'
import usuarioReducer from './Reducers/usuariosReducer'
import tituloReducer from './Reducers/tituloReducer'
import productosReducer from './Reducers/productosReducer'
import proveedoresReducer from './Reducers/proveedoresReducer'
import clientesReducer from './Reducers/clientesReducer'

const reducer = combineReducers({
  user: loginReducer,
  notificaciones: notificacionReducer,
  productos: productosReducer,
  proveedores: proveedoresReducer,
  clientes: clientesReducer,
  usuarios: usuarioReducer,
  titulo: tituloReducer,
})

export default createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))