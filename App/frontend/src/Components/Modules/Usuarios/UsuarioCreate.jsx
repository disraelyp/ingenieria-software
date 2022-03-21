import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useField from './../../../Hooks/useField'
import { roleUsuario } from './../../../Utils/options'
import { createNotification } from './../../../Reducers/notificacionesReducer'
import usuarioServices from './../../../Services/usuario'
import { initializeUsuarios } from './../../../Reducers/usuariosReducer'
import { Grid } from '@mui/material'
import TextInput from './../../athomic-components/TextInput'
import SelectInput from './../../athomic-components/SelectInput'
import Button from './../../athomic-components/Button'
import PasswordInput from './../../athomic-components/PasswordInput'
import { nombreValidate, passwordValidate, usuarioValidate, roleValidate } from './../../../Utils/validaciones'
import { updateTitulo } from './../../../Reducers/tituloReducer'
import { oneLine } from './../../../Styles/breakPoints'
import { inputForm, itemForm } from './../../../Styles/gridForm'

const UsuarioCreate = () => {

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateTitulo('Crear usuarios'))
  }, [dispatch])

  const Nombre = useField('text', '', nombreValidate)
  const Password = useField('text', '', passwordValidate)
  const Usuario = useField('text', '', usuarioValidate)
  const Role = useField('number', 0, roleValidate)

  const createErrorMessage = (message) => {
    switch (true) {
    case message.includes('nombre'):
      Nombre.functions.createError(message)
      break
    case message.includes('password'):
      Password.functions.createError(message)
      break
    case message.includes('usuario'):
      Usuario.functions.createError(message)
      break
    case message.includes('rol'):
      Role.functions.createError(message)
      break
    default:
      break
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const nuevoUsuario = {
      'Nombre': Nombre.form.value,
      'Password': Password.form.value,
      'Usuario': Usuario.form.value,
      'Activo': true,
      'Role': Role.form.label
    }
    const usuario = await usuarioServices.create(nuevoUsuario)
    if(usuario.data.error){
      createErrorMessage(usuario.data.message)
    } else {
      dispatch(initializeUsuarios())
      dispatch(createNotification('¡Usuario creado correctamente!', 'Información'))
      history.push('/Usuarios')
    }
  }

  const validate = () => {
    Nombre.functions.validate()
    Password.functions.validate()
    Usuario.functions.validate()
    Role.functions.validate()
  }

  const isValidate = () => {
    return Nombre.functions.isValidate() &&  Password.functions.isValidate() && Usuario.functions.isValidate() &&  Role.functions.isValidate()
  }

  return (
    <form onSubmit={onSubmit}>
      <Grid sx={{ width: '100%' }} container spacing={0} direction='column' alignItems='center' justifyContent='center'>
        <Grid item xs={12} sx={itemForm()}>
          <TextInput moreSx={oneLine} { ...Nombre.form } label={'Nombre'} />
        </Grid>
        <Grid item xs={12} sx={itemForm()}>
          <TextInput moreSx={oneLine} { ...Usuario.form } label={'Usuario'} />
        </Grid>
        <Grid item xs={12} sx={itemForm()}>
          <PasswordInput moreSx={oneLine} { ...Password.form } label={'Password'} />
        </Grid>
        <Grid item xs={12} sx={itemForm()}>
          <SelectInput moreSx={oneLine} { ...Role.form } options={roleUsuario} label={'Categorias de usuario'} text={'Seleccione un rol'} />
        </Grid>
        <Grid item xs={12} sx={itemForm()}>
          {isValidate() ?
            <Button moreSx={inputForm()} color={'success'} text={'Crear conductor'} submit={true} />:
            <Button moreSx={inputForm()} color={'success'} text={'Crear conductor'} onClick={() => validate()} />
          }
          <Button moreSx={inputForm()} onClick={() => history.push('/Usuarios')} color={'error'} text={'Salir'} />
        </Grid>
      </Grid>
    </form>
  )
}

export default UsuarioCreate