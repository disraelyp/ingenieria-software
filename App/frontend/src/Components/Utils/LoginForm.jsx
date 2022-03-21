import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from './../../Reducers/loginReducer'
import useField from './../../Hooks/useField'
import storage from './../../Utils/loginLocalStorage'
import loginService from './../../Services/login'
import Typography from '@mui/material/Typography'
import { Box, Container } from '@mui/material'
import Button from './../athomic-components/Button'
import PasswordInput from './../athomic-components/PasswordInput'
import TextInput from './../athomic-components/TextInput'
import { useHistory } from 'react-router-dom'
import { createNotification } from './../../Reducers/notificacionesReducer'
import { passwordValidate, usuarioValidate } from './../../Utils/validaciones'

const LoginForm = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const password = useField('password', '', passwordValidate)
  const usuario = useField('text', '', usuarioValidate)

  const createErrorMessage = (message) => {
    switch (true) {
    case message.includes('nombre de Usuario'):
      usuario.functions.createError(message)
      break
    default:
      password.functions.createError(message)
      break
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const user = await loginService.login({ 'Usuario': usuario.form.value, 'Password': password.form.value })
    if(user.error){
      createErrorMessage(user.message)
    } else{
      password.functions.reset()
      usuario.functions.reset()
      dispatch(createNotification('¡Inicio de sección correcto!', 'Información'))
      dispatch(login(user))
      storage.saveUser(user)
      history.push('/')
    }
  }

  return(
    <>
      <Container sx={{ minWidth: '300px', width: '50%', marginTop: '10vh', border: 1, borderColor: '#bdbdbd', padding: '5%', maxPadding: '50px', borderRadius: 2, }}>
        <Typography variant='h2' component='div' align ='center' gutterBottom>
        Acceder al sistema
        </Typography>
        <Box noValidate>
          <form onSubmit={handleLogin}>
            <TextInput { ...usuario.form } label={'Usuario'} />
            <PasswordInput { ...password.form } label={'Contraseña'} />
            <Button submit={true} text={'Acceder'} />
          </form>
        </Box>
      </Container>
      <Typography variant='h9' sx={{ color: '#bdbdbd', marginTop: '5px', }} component='div' align ='center' gutterBottom>Crafted with ♥️ by Disraely & Leslie</Typography>
    </>
  )
}

export default LoginForm