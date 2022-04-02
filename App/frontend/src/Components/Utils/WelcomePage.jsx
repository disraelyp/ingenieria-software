
import React, { useEffect } from 'react'
import { Container } from '@mui/material'
import { initializeUsuarios } from './../../Reducers/usuariosReducer'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { initializeProductos } from './../../Reducers/productosReducer'
import { initializeProveedores } from './../../Reducers/proveedoresReducer'
import { initializeClientes } from './../../Reducers/clientesReducer'
import { initializePedidos } from '../../Reducers/pedidosReducer'

const WelcomePage = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(initializeUsuarios())
    dispatch(initializeProductos())
    dispatch(initializePedidos())
    dispatch(initializeProveedores())
    dispatch(initializeClientes())
    setTimeout(() => history.push('/'), 500)
  }, [history, dispatch])

  return (
    <Container>

    </Container>
  )
}

export default WelcomePage