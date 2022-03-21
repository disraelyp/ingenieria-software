import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import useField from './../../../Hooks/useField'
import { updateTitulo } from './../../../Reducers/tituloReducer'
import { oneLine } from './../../../Styles/breakPoints'
import { inputForm, itemForm } from './../../../Styles/gridForm'
import Button from './../../athomic-components/Button'
import SelectInput from './../../athomic-components/SelectInput'
import TextInput from './../../athomic-components/TextInput'
import NotFound from './../../Utils/NotFound'
import { defaultValue } from './../../../Utils/defaultValue'

const Usuario = () => {

  const id = useParams().id
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateTitulo('Ver usuario'))
  }, [dispatch])

  const usuarios = useSelector(state => { return state.usuarios })
  const usuario = usuarios.find(item => item.ID === parseInt(id))

  const Nombre = useField('text', usuario.Nombre)
  const Usuario = useField('text', usuario.Usuario)
  const Role = useField('number', 0)

  if(!usuario) {
    return <NotFound />
  }

  return (
    <Grid sx={{ width: '100%' }} container spacing={0} direction='column' alignItems='center' justifyContent='center'>
      <Grid item xs={12} sx={itemForm()}>
        <TextInput disable={true} moreSx={oneLine} { ...Nombre.form } label={'Nombre'} />
      </Grid>
      <Grid item xs={12} sx={itemForm()}>
        <TextInput disable={true} moreSx={oneLine} { ...Usuario.form } label={'Usuario'} />
      </Grid>
      <Grid item xs={12} sx={itemForm()}>
        <SelectInput disable={true} moreSx={oneLine} { ...Role.form } options={defaultValue(usuario.Role)} label={'Categorias de usuario'} text={'Seleccione un rol'} />
      </Grid>
      <Grid item xs={12} sx={itemForm()}>
        <Button moreSx={inputForm()} onClick={() => history.push('/Usuarios')} color={'error'} text={'Salir'} />
      </Grid>
    </Grid>
  )
}

export default Usuario