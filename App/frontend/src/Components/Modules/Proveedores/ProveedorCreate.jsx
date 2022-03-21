import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useField from './../../../Hooks/useField'
import { createNotification } from './../../../Reducers/notificacionesReducer'
import proveedorService from './../../../Services/proveedor'
import { initializeProveedores } from './../../../Reducers/proveedoresReducer'
import { Grid } from '@mui/material'
import TextInput from './../../athomic-components/TextInput'
import Button from './../../athomic-components/Button'
import { nombreValidate } from './../../../Utils/validaciones'
import { updateTitulo } from './../../../Reducers/tituloReducer'
import { oneLine } from './../../../Styles/breakPoints'
import { inputForm, itemForm } from './../../../Styles/gridForm'

const ProveedorCreate = () => {

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateTitulo('Crear proveedores'))
  }, [dispatch])

  const RNC = useField('text', '', nombreValidate)
  const Nombre = useField('text', '', nombreValidate)
  const Telefono = useField('text', '', nombreValidate)
  const Direccion = useField('text', '', nombreValidate)

  const createErrorMessage = (message) => {
    switch (true) {
    case message.includes('rnc'):
      RNC.functions.createError(message)
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
    const nuevoProveedor = {
      'RNC': RNC.form.value,
      'Nombre': Nombre.form.value,
      'Telefono': Telefono.form.value,
      'Direccion': Direccion.form.value
    }
    const proveedor = await proveedorService.create(nuevoProveedor)
    if(proveedor.data.error){
      createErrorMessage(proveedor.data.message)
    } else {
      dispatch(initializeProveedores())
      dispatch(createNotification('¡Proveedor creado correctamente!', 'Información'))
      history.push('/Proveedores')
    }
  }

  const validate = () => {
    RNC.functions.validate()
    Nombre.functions.validate()
    Telefono.functions.validate()
    Direccion.functions.validate()
  }

  const isValidate = () => {
    return RNC.functions.isValidate() &&  Nombre.functions.isValidate() && Telefono.functions.isValidate() &&  Direccion.functions.isValidate()
  }

  return (
    <form onSubmit={onSubmit}>
      <Grid sx={{ width: '100%' }} container spacing={0} direction='column' alignItems='center' justifyContent='center'>
        <Grid item xs={12} sx={itemForm()}>
          <TextInput moreSx={oneLine} { ...RNC.form } label={'RNC'} />
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
            <Button moreSx={inputForm()} color={'success'} text={'Crear proveedor'} submit={true} />:
            <Button moreSx={inputForm()} color={'success'} text={'Crear proveedor'} onClick={() => validate()} />
          }
          <Button moreSx={inputForm()} onClick={() => history.push('/Proveedores')} color={'error'} text={'Salir'} />
        </Grid>
      </Grid>
    </form>
  )
}

export default ProveedorCreate