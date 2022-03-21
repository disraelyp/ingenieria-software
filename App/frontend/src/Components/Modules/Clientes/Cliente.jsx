import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import useField from './../../../Hooks/useField'
import { updateTitulo } from './../../../Reducers/tituloReducer'
import { oneLine } from './../../../Styles/breakPoints'
import { itemForm } from './../../../Styles/gridForm'
import Button from './../../athomic-components/Button'
import TextInput from './../../athomic-components/TextInput'
import NotFound from './../../Utils/NotFound'
import { nombreValidate } from './../../../Utils/validaciones'

const Cliente = () => {

  const id = useParams().id
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateTitulo('Ver cliente'))
  }, [dispatch])

  const clientes = useSelector(state => { return state.clientes })
  const cliente = clientes.find(item => item.ID === parseInt(id))

  const Cedula = useField('text', cliente.Cedula, nombreValidate)
  const Nombre = useField('text', cliente.Nombre, nombreValidate)
  const Telefono = useField('text', cliente.Telefono, nombreValidate)
  const Direccion = useField('text', cliente.Direccion, nombreValidate)

  if(!cliente) {
    return <NotFound />
  }

  return (
    <Grid sx={{ width: '100%' }} container spacing={0} direction='column' alignItems='center' justifyContent='center'>
      <Grid item xs={12} sx={itemForm()}>
        <TextInput disable={true} moreSx={oneLine} { ...Cedula.form } label={'Cedula'} />
      </Grid>
      <Grid item xs={12} sx={itemForm()}>
        <TextInput disable={true} moreSx={oneLine} { ...Nombre.form } label={'Nombre'} />
      </Grid>
      <Grid item xs={12} sx={itemForm()}>
        <TextInput disable={true} moreSx={oneLine} { ...Telefono.form } label={'Telefono'} />
      </Grid>
      <Grid item xs={12} sx={itemForm()}>
        <TextInput disable={true} moreSx={oneLine} { ...Direccion.form } label={'Direccion'} />
      </Grid>
      <Grid item xs={12} sx={itemForm()}>
        <Button moreSx={oneLine} onClick={() => history.push('/Clientes')} color={'error'} text={'Salir'} />
      </Grid>
    </Grid>
  )
}

export default Cliente