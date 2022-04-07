import React from 'react'
import { useDispatch } from 'react-redux'
import compraEstado from '../../../Services/compraEstado'
import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material'
import { initializeCompras } from '../../../Reducers/comprasReducer'
import { createNotification } from '../../../Reducers/notificacionesReducer'
import Button from '../../athomic-components/Button'
import { modalStyle } from '../../../Styles/modalStyle'


const PagoModal = ({ id, setOpenPagoModal }) => {

  const dispatch = useDispatch()

  const pagarCompra = async () => {
    const response = await compraEstado.change({ 'ID': id, 'Pagado': true })
    if(!response.error) {
      dispatch(initializeCompras())
      dispatch(createNotification('¡Pago emitido correctamente!', 'Información'))
    }
    setOpenPagoModal(false)
  }

  return (
    <Modal aria-labelledby='transition-modal-title' aria-describedby='transition-modal-description' open={true} onClose={() => setOpenPagoModal(false)} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500, }} >
      <Fade in={true}>
        <Box sx={modalStyle}>
          <Typography id='transition-modal-title' variant='h6' component='h2'>
            { '¿Seguro que desea emitir el pago de esta compra (ID:'+id+')?'  }
          </Typography>
          <Typography id='transition-modal-description' sx={{ mt: 2 }}>
            Esta acción es irreversible, no podra volver al estado de no pagado.
          </Typography>
          <Button onClick={() => pagarCompra()} text={'Confirmar'} color='error' />
          <Button onClick={() => setOpenPagoModal(false)} text={'Cancelar'} color='success' />
        </Box>
      </Fade>
    </Modal>
  )
}

export default PagoModal