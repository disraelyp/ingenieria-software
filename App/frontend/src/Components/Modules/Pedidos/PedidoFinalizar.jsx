import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import pedidoServices from '../../../Services/pedidoEstado'
import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material'
import { initializePedidos } from '../../../Reducers/pedidosReducer'
import { createNotification } from '../../../Reducers/notificacionesReducer'
import Button from '../../athomic-components/Button'
import { modalStyle } from '../../../Styles/modalStyle'


const PedidoeFinalizarModal = ({ id, setOpenFinalizarModal }) => {

  const dispatch = useDispatch()
  const pedidos = useSelector(state => { return state.pedidos })
  const pedido = pedidos.find(pedido => pedido.ID === id)

  const deletePedido = async () => {
    const response = await pedidoServices.change({ 'ID': pedido.ID, 'Estado': 'Finalizado', 'Pagado': pedido.Pagado })
    if(!response.error) {
      dispatch(initializePedidos())
      dispatch(createNotification('¡Pedido modificado correctamente!', 'Información'))
    }
    setOpenFinalizarModal(false)
  }

  return (
    <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={true} onClose={() => setOpenFinalizarModal(false)} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500, }} >
      <Fade in={true}>
        <Box sx={modalStyle}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            { '¿Seguro que desea finalizar este pedido (ID:'+id+')?'  }
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Esta acción es irreversible, por lo que asegurate que de verdad tengas que finalizar el pedido.
          </Typography>
          <Button onClick={() => deletePedido()} text={'Confirmar'} color='success' />
          <Button onClick={() => setOpenFinalizarModal(false)} text={'Cancelar'} color='error' />
        </Box>
      </Fade>
    </Modal>
  )
}

export default PedidoeFinalizarModal