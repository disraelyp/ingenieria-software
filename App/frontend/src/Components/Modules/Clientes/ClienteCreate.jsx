import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useField from './../../../Hooks/useField'
import { createNotification } from './../../../Reducers/notificacionesReducer'
import clienteService from './../../../Services/cliente'
import { initializeClientes } from './../../../Reducers/clientesReducer'
import { Grid } from '@mui/material'
import TextInput from './../../athomic-components/TextInput'
import Button from './../../athomic-components/Button'
import { direccionValidate, nombreValidate, telefonoValidate } from './../../../Utils/validaciones'
import { updateTitulo } from './../../../Reducers/tituloReducer'
import { oneLine } from './../../../Styles/breakPoints'
import { inputForm, itemForm } from './../../../Styles/gridForm'

const ClienteCreate = () => {

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateTitulo('Crear clientes'))
  }, [dispatch])

  const Cedula = useField('text', '', nombreValidate)
  const Nombre = useField('text', '', nombreValidate)
  const Telefono = useField('text', '', telefonoValidate)
  const Direccion = useField('text', '', direccionValidate)

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
    const cliente = await clienteService.create(nuevoCliente)
    if(cliente.data.error){
      createErrorMessage(cliente.data.message)
    } else {
      dispatch(initializeClientes())
      dispatch(createNotification('¡Cliente creado correctamente!', 'Información'))
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

export default ClienteCreate