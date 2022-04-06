import React from 'react'
import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../athomic-components/Button'
import useField from './../../../Hooks/useField'
import { cantidadValidate } from '../../../Utils/validaciones'
import TextInput from '../../athomic-components/TextInput'
import pedidoEstadoService from './.../../../../../Services/pedidoEstado'
import historialPagosService from '../../../Services/historialPagos'
import { initializeHistorialPagos } from '../../../Reducers/historialPagos'
import { initializePedidos } from '../../../Reducers/pedidosReducer'
import { createNotification } from '../../../Reducers/notificacionesReducer'

const EmitirPagoModal = ({ setOpenEmitirPagoModal, ultimoPago }) => {

  const user = useSelector(state => { return state.user })
  const dispatch = useDispatch()
  const SaldoPendiente = useField('number', ultimoPago[0].SaldoPendiente, cantidadValidate)
  const Pendiente  = useField('number', 0, cantidadValidate)

  const TotalPagadoValidate = (value) => {
    if (value <= 0 || parseInt(value)> parseInt(SaldoPendiente.form.value)) {
      return 'Ingrese mayor 0 y, menor o igual a la cantidad debida'
    }
    return null
  }
  const TotalPagado = useField('number', 0, TotalPagadoValidate)


  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    minWidth: 600,
    maxWidth: 800,
    bgcolor: 'white',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
  }

  const onSubmit = async () => {
    if(TotalPagado.functions.isValidate()){
      const nuevoPago = {
        Descripcion: 'Realizacion de pago en cuenta a credito',
        Termino: ultimoPago[0].Termino,
        PagoMinimo: ultimoPago[0].PagoMinimo,
        SaldoPendiente: parseInt(SaldoPendiente.form.value) - parseInt(TotalPagado.form.value),
        SaldoPagado: parseInt(TotalPagado.form.value),
        Pendiente: !(ultimoPago[0].SaldoPagado + parseInt(TotalPagado.form.value) === ultimoPago[0].SaldoPendiente),
        Vendedor: user.user.Nombre,
        Cliente: ultimoPago[0].Cliente.ID,
        Pedido: ultimoPago[0].Pedido.ID
      }

      await pedidoEstadoService.change({ 'ID': nuevoPago.Pedido, 'Estado': ultimoPago[0].Pedido.Estado, 'Pagado': !nuevoPago.Pendiente })
      await historialPagosService.create(nuevoPago)

      dispatch(initializePedidos())
      dispatch(initializeHistorialPagos())
      setOpenEmitirPagoModal(false)
      dispatch(createNotification('Pago emitido correctamente!', 'Información'))
    } else {
      TotalPagado.functions.validate()
    }
  }



  return (
    <Modal aria-labelledby='transition-modal-title' aria-describedby='transition-modal-description' open={true} onClose={() => setOpenEmitirPagoModal(false)} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500, }} >
      <Fade in={true}>
        <Box sx={modalStyle}>
          <Typography variant='h4' noWrap component='div'>
            Emitir pago
          </Typography>
          <TextInput disable={true} { ...SaldoPendiente.form } label={'Saldo pendiente'}/>
          <TextInput { ...TotalPagado.form } label={'Total a pagar'}/>
          <TextInput disable={true} { ...Pendiente.form } value={parseInt(SaldoPendiente.form.value) - parseInt(TotalPagado.form.value)} label={'Saldo pendiente restante'}/>

          <Button onClick={() => onSubmit()} text={'Aceptar'} color='success' />
          <Button onClick={() => setOpenEmitirPagoModal(false) } text={'Cancelar'} color='error' />
        </Box>
      </Fade>
    </Modal>
  )
}

export default EmitirPagoModal