import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import useField from '../../../Hooks/useField'
import { createNotification } from '../../../Reducers/notificacionesReducer'
import { updateTitulo } from '../../../Reducers/tituloReducer'
import { initializeUsuarios } from '../../../Reducers/usuariosReducer'
import { oneLine } from '../../../Styles/breakPoints'
import { inputForm, itemForm } from '../../../Styles/gridForm'
import { roleUsuario } from '../../../Utils/options'
import { nombreValidate, passwordValidate, roleValidate, usuarioValidate } from '../../../Utils/validaciones'
import Button from '../../athomic-components/Button'
import PasswordInput from '../../athomic-components/PasswordInput'
import SelectInput from '../../athomic-components/SelectInput'
import TextInput from '../../athomic-components/TextInput'
import NotFound from './../../Utils/NotFound'
import usuarioServices from '../../../Services/usuario'


const UsuarioUpdate = () => {

  const id = useParams().id
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateTitulo('Actualizar usuario'))
  }, [dispatch])

  const usuarios = useSelector(state => { return state.usuarios })
  const usuario = usuarios.find(item => item.ID === parseInt(id))

  const Nombre = useField('text', usuario.Nombre, nombreValidate)
  const Password = useField('text', '', passwordValidate)
  const Usuario = useField('text', usuario.Usuario, usuarioValidate)
  const Role = useField('number', roleUsuario.find(role => role.label === usuario.Role).value, roleValidate)

  const createErrorMessage = (message) => {
    switch (true) {
    case message.includes('nombre'):
      Nombre.functions.createError(message)
      break
    case message.includes('password'):
      Password.functions.createError(message)
      break
    case message.includes('role del'):
      Role.functions.createError(message)
      break
    case message.includes('usuario'):
      Usuario.functions.createError(message)
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
      'Rol': Role.form.value
    }
    const usuario = await usuarioServices.update(parseInt(id), nuevoUsuario)
    if(usuario.data.error){
      createErrorMessage(usuario.data.message)
    } else {
      dispatch(initializeUsuarios())
      dispatch(createNotification('¡Usuario modificado correctamente!', 'Información'))
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

  if(!usuario) {
    return <NotFound />
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
            <Button moreSx={inputForm()} color={'success'} text={'Actualizar usuario'} submit={true} />:
            <Button moreSx={inputForm()} color={'success'} text={'Actualizar usuario'} onClick={() => validate()} />
          }
          <Button moreSx={inputForm()} onClick={() => history.push('/Usuarios')} color={'error'} text={'Salir'} />
        </Grid>
      </Grid>
    </form>
  )
}


export default UsuarioUpdate