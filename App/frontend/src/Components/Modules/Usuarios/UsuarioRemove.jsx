import React from 'react'
import { useDispatch } from 'react-redux'
import UsuarioServices from './../../../Services/usuario'
import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material'
import { initializeUsuarios } from './../../../Reducers/usuariosReducer'
import { createNotification } from './../../../Reducers/notificacionesReducer'
import Button from './../../athomic-components/Button'
import { modalStyle } from './../../../Styles/modalStyle'


const UsuarioRemoveModal = ({ id, setOpenModal }) => {

  const dispatch = useDispatch()

  const deleteUsuario = () => {
    const response = UsuarioServices.remove(id)
    if(!response.error) {
      dispatch(initializeUsuarios())
      dispatch(createNotification('¡Usuario eliminado correctamente!', 'Información'))
    }
    setOpenModal(false)
  }

  return (
    <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={true} onClose={() => setOpenModal(false)} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500, }} >
      <Fade in={true}>
        <Box sx={modalStyle}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            { '¿Seguro que desea eliminar este usuario (ID:'+id+')?'  }
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Esta acción es irreversible, si en algún momento deseas este usuario deberás crearlo nuevamente.
          </Typography>
          <Button onClick={() => deleteUsuario()} text={'Confirmar'} color='error' />
          <Button onClick={() => setOpenModal(false)} text={'Cancelar'} color='success' />
        </Box>
      </Fade>
    </Modal>
  )
}

export default UsuarioRemoveModal