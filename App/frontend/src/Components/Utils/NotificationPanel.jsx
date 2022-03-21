import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Fade, Modal, Typography } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import { Box } from '@mui/system'
import { modalStyle } from './../../Styles/modalStyle'
import Button from './../athomic-components/Button'
import { deleteNotification } from './../../Reducers/notificacionesReducer'

const NotificationPanel = ({ notificaciones }) => {

  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(true)

  setTimeout(() => {
    setOpenModal(false)
    dispatch(deleteNotification())
  }, 5000)

  const onClose = () => {
    dispatch(deleteNotification())
    setOpenModal(false)
  }

  return (
    <Modal aria-labelledby="notification-modal-title" onClose={() => onClose()} aria-describedby="notification-modal-description" open={openModal} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500, }} >
      <Fade in={openModal}>
        <Box sx={modalStyle}>
          <Typography id="notification-modal-title" variant="h6" component="h2">
            { notificaciones.severity }
          </Typography>
          <Typography id="notification-modal-description" sx={{ mt: 2 }}>
            { notificaciones.message }
          </Typography>
          <Button onClick={() => onClose()} text={'Cerrar'} color='error' />
        </Box>
      </Fade>
    </Modal>
  )
}

export default NotificationPanel