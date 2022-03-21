import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import useField from './../../../Hooks/useField'
import { createNotification } from './../../../Reducers/notificacionesReducer'
import { updateTitulo } from './../../../Reducers/tituloReducer'
import { oneLine } from './../../../Styles/breakPoints'
import { inputForm, itemForm } from './../../../Styles/gridForm'
import { nombreValidate } from './../../../Utils/validaciones'
import Button from './../../athomic-components/Button'
import TextInput from './../../athomic-components/TextInput'
import NotFound from './../../Utils/NotFound'
import clienteServices from './../../../Services/cliente'
import { initializeClientes } from './../../../Reducers/clientesReducer'


const ClienteUpdate = () => {

  const id = useParams().id
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateTitulo('Actualizar cliente'))
  }, [dispatch])

  const clientes = useSelector(state => { return state.clientes })
  const cliente = clientes.find(item => item.ID === parseInt(id))

  const Cedula = useField('text', cliente.Cedula, nombreValidate)
  const Nombre = useField('text', cliente.Nombre, nombreValidate)
  const Telefono = useField('text', cliente.Telefono, nombreValidate)
  const Direccion = useField('text', cliente.Direccion, nombreValidate)

  const createErrorMessage = (message) => {
    switch (true) {
    case message.includes('Cedula'):
      Cedula.functions.createError(message)
      break
    case message.includes('nombre'):
      Nombre.functions.createError(message)
      break
    case message.includes('telefono'):
      Telefono.functions.createError(message)
      break
    case message.includes('direccion'):
      Direccion.functions.createError(message)
      break
    default:
      break
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const nuevoCliente = {
      'Cedula': Cedula.form.value,
      'Nombre': Nombre.form.value,
      'Telefono': Telefono.form.value,
      'Direccion': Direccion.form.value
    }
    const cliente = await clienteServices.create(nuevoCliente)
    if(cliente.data.error){
      createErrorMessage(cliente.data.message)
    } else {
      dispatch(initializeClientes())
      dispatch(createNotification('¡Clientescreado correctamente!', 'Información'))
      history.push('/Clientes')
    }
  }

  const validate = () => {
    Cedula.functions.validate()
    Nombre.functions.validate()
    Telefono.functions.validate()
    Direccion.functions.validate()
  }

  const isValidate = () => {
    return Cedula.functions.isValidate() &&  Nombre.functions.isValidate() && Telefono.functions.isValidate() &&  Direccion.functions.isValidate()
  }

  if(!cliente) {
    return <NotFound />
  }
  return (
    <form onSubmit={onSubmit}>
      <Grid sx={{ width: '100%' }} container spacing={0} direction='column' alignItems='center' justifyContent='center'>
        <Grid item xs={12} sx={itemForm()}>
          <TextInput moreSx={oneLine} { ...Cedula.form } label={'Cedula'} />
        </Grid>
        <Grid item xs={12} sx={itemForm()}>
          <TextInput moreSx={oneLine} { ...Nombre.form } label={'Nombre'} />
        </Grid>
        <Grid item xs={12} sx={itemForm()}>
          <TextInput moreSx={oneLine} { ...Telefono.form } label={'Telefono'} />
        </Grid>
        <Grid item xs={12} sx={itemForm()}>
          <TextInput moreSx={oneLine} { ...Direccion.form } label={'Direccion'} />
        </Grid>
        <Grid item xs={12} sx={itemForm()}>
          {isValidate() ?
            <Button moreSx={inputForm()} color={'success'} text={'Crear cliente'} submit={true} />:
            <Button moreSx={inputForm()} color={'success'} text={'Crear cliente'} onClick={() => validate()} />
          }
          <Button moreSx={inputForm()} onClick={() => history.push('/Clientes')} color={'error'} text={'Salir'} />
        </Grid>
      </Grid>
    </form>
  )
}


export default ClienteUpdate