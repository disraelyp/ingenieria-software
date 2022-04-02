import React from 'react'
import { useDispatch } from 'react-redux'
import ProductoServices from './../../../Services/pedido'
import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material'
import { initializeProductos } from './../../../Reducers/pedid'
import { createNotification } from './../../../Reducers/notificacionesReducer'
import Button from './../../athomic-components/Button'
import { modalStyle } from './../../../Styles/modalStyle'


const PedidoRemoveModal = ({ id, setOpenModal }) => {

  const dispatch = useDispatch()

  const deletePedido= () => {
    const response = ProductoServices.remove(id)
    dispatch(initializeProductos())
    if(!response.error) {
      dispatch(createNotification('¡Pedido eliminado correctamente!', 'Información'))
    }
    setOpenModal(false)
  }

  return (
    <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={true} onClose={() => setOpenModal(false)} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500, }} >
      <Fade in={true}>
        <Box sx={modalStyle}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            { '¿Seguro que desea eliminar este producto (ID:'+id+')?'  }
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Esta acción es irreversible, si en algún momento deseas este producto deberás crearlo nuevamente.
          </Typography>
          <Button onClick={() => deletePedido()} text={'Confirmar'} color='error' />
          <Button onClick={() => setOpenModal(false)} text={'Cancelar'} color='success' />
        </Box>
      </Fade>
    </Modal>
  )
}

export default PedidoRemoveModal