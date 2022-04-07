/* eslint-disable no-unused-vars */
import React from 'react'
import { Backdrop, Box, Fade, Grid, Modal, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../athomic-components/Button'
import TextInput from '../../athomic-components/TextInput'
import SwitchInput from '../../athomic-components/Switch'
import { cantidadValidate, metodoPagoValidate } from '../../../Utils/validaciones'
import useField from './../../../Hooks/useField'
import useSwitch from './../../../Hooks/useSwitch'
import SelectInput from '../../athomic-components/SelectInput'
import { initializePedidos } from '../../../Reducers/pedidosReducer'
import { initializeProductos } from '../../../Reducers/productosReducer'
import { initializeDevoluciones } from '../../../Reducers/devolucionesReducer'
import pedidoEstadoService from './.../../../../../Services/pedidoEstado'
import historialPagoService from './.../../../../../Services/historialPagos'
import devolucionEstadoService from './.../../../../../Services/devolucionEstado'
import { createNotification } from './../../../Reducers/notificacionesReducer'
import { useHistory } from 'react-router-dom'
import { initializeHistorialPagos } from '../../../Reducers/historialPagos'


const FacturacionModal = ({ setOpenFacturacionModal, pedidoSeleccionado }) => {

  const dispatch = useDispatch()
  const history = useHistory()
  const pedidos = useSelector(state => { return state.pedidos })
  const user = useSelector(state => { return state.user })
  const pedido = pedidos.find(pedido => pedido.ID === pedidoSeleccionado.id)

  const devoluciones = (useSelector(state => { return state.devoluciones })).filter(devolucion => !(devolucion.Pagado) && devolucion.Cliente.ID === pedido.Cliente.ID)
  const totalDevoluciones = () => {
    let total=0
    if(devoluciones.length !== 0) {
      devoluciones.map(devolucion => (devolucion.Productos).map(producto => total += ((producto.Precio+producto.Impuesto)*producto.Cantidad)))
    }
    return total
  }
  const saldoFavorAprobado = () => {
    return ((totalDevoluciones() <= (parseInt((pedidoSeleccionado.Total).slice(2, pedidoSeleccionado.length)))) && totalDevoluciones()!==0 && Metodo.form.value === 1)
  }
  const saldoFavorSwitch = useSwitch(false)
  const Total = useField('number', (parseInt((pedidoSeleccionado.Total).slice(2, pedidoSeleccionado.length))), cantidadValidate)
  const Metodo = useField('number', 0, metodoPagoValidate)
  const MinimoPagar = useField('number', Total.form.value, cantidadValidate)
  const saldoFavor = useField('number', totalDevoluciones(), cantidadValidate)
  const Devuelta = useField('number', 0, cantidadValidate)

  const totalFinal = () => {
    if(saldoFavorAprobado()) {
      return (parseInt(Total.form.value) - totalDevoluciones())
    }
    return parseInt(Total.form.value)
  }
  const devuelta = () => {
    if (parseInt(Metodo.form.value)  === 1) {
      return  (TotalPagar.form.value- totalFinal())
    }
    return 0
  }

  const totalPagarValidate = (value) => {
    if(Metodo.form.value === 1) {
      if (value !== totalFinal()) {
        return 'Ingrese una cantidad valida'
      }
      return null
    } else {
      if (value > 0 && value >= totalFinal()) {
        return 'Ingrese una cantidad valida'
      }
      return null
    }
  }
  const TotalPagar = useField('number', 0, totalPagarValidate)

  const minimoPagar = () => {
    if (parseInt(Metodo.form.value)  === 1) {
      return Total.form.value
    }
    return 0
  }



  const metodosPago = () => {
    const pedidosCliente = pedidos.filter(a => a.Cliente.ID === pedido.Cliente.ID)
    const pedidosFacturados = pedidosCliente.filter(pedido => pedido.Estado !== 'En proceso')
    const estadosPedidos = pedidosFacturados.map(pedido => pedido.Pagado)

    if(estadosPedidos.includes(false)){
      return [
        { label: 'Efectivo', value: 1 },
      ]
    }
    return [
      { label: 'Efectivo', value: 1 },
      { label: '15 dias', value: 15 },
      { label: '30 dias', value: 30 },
      { label: '45 dias', value: 45 },
    ]
  }



  const cambiarEstadoDevolucion = () => {
    if  (saldoFavorAprobado()) {
      const IDS = devoluciones.map(devolucion => devolucion.ID)
      IDS.map(async ID => await devolucionEstadoService.change({ 'ID': ID, 'Pagado': true }))
    }
  }

  const facturarEnviar = async () => {
    if(Metodo.form.value === 1 && TotalPagar.form.value !== totalFinal()) {
      TotalPagar.functions.setValue(totalFinal())
    } else {
      if(TotalPagar.functions.isValidate() && Metodo.functions.isValidate()){
        const nuevoPago = {
          Descripcion: 'Facturacion y envio a domicilio de un nuevo pedido',
          Termino: Metodo.form.value,
          PagoMinimo: MinimoPagar.form.value,
          SaldoPendiente: Metodo.form.value === 1 ? 0 :  totalFinal() - parseInt(TotalPagar.form.value),
          SaldoPagado: Metodo.form.value === 1 ? (parseInt((pedidoSeleccionado.Total).slice(2, pedidoSeleccionado.length))) : parseInt(TotalPagar.form.value),
          Pendiente: Metodo.form.value === 1 ? false : true,
          Vendedor: user.user.Nombre,
          Cliente: pedido.Cliente.ID,
          Pedido: pedido.ID
        }
        cambiarEstadoDevolucion()
        await pedidoEstadoService.change({ 'ID': pedido.ID, 'Estado': 'En camino', 'Pagado': !nuevoPago.Pendiente })
        await historialPagoService.create(nuevoPago)
        dispatch(initializePedidos())
        dispatch(initializeProductos())
        dispatch(initializeHistorialPagos())
        dispatch(initializeDevoluciones())
        dispatch(createNotification('Pedido facturado e enviado correctamente!', 'Información'))
        setOpenFacturacionModal(false)
        history.push('/Facturacion/Pedidos')
      } else {
        TotalPagar.functions.validate()
        Metodo.functions.validate()
      }
    }
  }


  const facturarFinalizar = async () => {
    if(Metodo.form.value === 1 && TotalPagar.form.value !==totalFinal()) {
      TotalPagar.functions.setValue(totalFinal())
    } else {
      if(TotalPagar.functions.isValidate() && Metodo.functions.isValidate()){
        const nuevoPago = {
          Descripcion: 'Facturacion inmediata de nuevo pedido',
          Termino: Metodo.form.value,
          PagoMinimo: MinimoPagar.form.value,
          SaldoPendiente: Metodo.form.value === 1 ? 0 :  totalFinal() - parseInt(TotalPagar.form.value),
          SaldoPagado: Metodo.form.value === 1 ? (parseInt((pedidoSeleccionado.Total).slice(2, pedidoSeleccionado.length))) : parseInt(TotalPagar.form.value),
          Pendiente: Metodo.form.value === 1 ? false : true,
          Vendedor: user.user.Nombre,
          Cliente: pedido.Cliente.ID,
          Pedido: pedido.ID
        }
        cambiarEstadoDevolucion()
        await pedidoEstadoService.change({ 'ID': pedido.ID, 'Estado': 'Finalizado', 'Pagado': !nuevoPago.Pendiente })
        await historialPagoService.create(nuevoPago)
        dispatch(initializePedidos())
        dispatch(initializeProductos())
        dispatch(initializeHistorialPagos())
        dispatch(initializeDevoluciones())
        dispatch(createNotification('Pedido facturado correctamente!', 'Información'))
        setOpenFacturacionModal(false)
        history.push('/Facturacion/Pedidos')
      } else {
        TotalPagar.functions.validate()
        Metodo.functions.validate()
      }
    }
  }

  const cancelarBoton = () => {
    setOpenFacturacionModal(false)
  }


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


  return (
    <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={true} onClose={() => setOpenFacturacionModal(false)} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500, }} >
      <Fade in={true}>
        <Box sx={modalStyle}>
          <Typography variant="h4" noWrap component="div">
            {'Facturar pedido (ID: '+pedido.ID+')'}
          </Typography>
          <div onClick={minimoPagar} style={{ height: 'calc(80vh - 230px)', minHeight: '100px', width: '100%', marginTop: 20 }} >
            <TextInput moreSx={{ marginTop: 1, width: '100%' }} disable={true} label={'Total a pagar'} { ...Total.form} />
            <Grid spacing={2} container >
              <Grid item xs={8} >
                <TextInput disable={true} label={'Saldo a favor'} { ...saldoFavor.form} />
              </Grid>
              <Grid item xs={4}>
                <SwitchInput disable={true} label={'Usar saldo disponible'} { ...saldoFavorSwitch } checked={saldoFavorAprobado()} moreSx={{ marginTop: 3, width: '100%' }} />
              </Grid>
            </Grid>

            <SelectInput { ...Metodo.form } moreSx={{ marginTop: 1, width: '100%' }} label={'Metodos de pago'} text={'Seleccione un metodo de pago'} options={metodosPago()} />
            <TextInput disable={true} moreSx={{ marginTop: 1, width: '100%' }} label={'Monto minimo a pagar'} { ...MinimoPagar.form } value={minimoPagar()} />
            <TextInput moreSx={{ marginTop: 1, width: '100%' }} label={'Monto a pagar'} { ...TotalPagar.form } />
            <TextInput disable={true} moreSx={{ marginTop: 1, width: '100%' }} label={'Monto a devolver'} { ...Devuelta.form } value={devuelta()} />
          </div>
          <div>
            <Button onClick ={() => facturarEnviar()}moreSx={{ width: '49%', marginTop: 2, }} text={'Facturar y Enviar'} color='primary' />
            <Button onClick ={() => facturarFinalizar()} moreSx={{ width: '49%', marginTop: 2, marginLeft: '2%' }} text={'Facturar y Finalizar'} color='success' />
          </div>
          <Button onClick={() => cancelarBoton()} text={'Cancelar'} color='error' />
        </Box>
      </Fade>
    </Modal>
  )
}

export default FacturacionModal