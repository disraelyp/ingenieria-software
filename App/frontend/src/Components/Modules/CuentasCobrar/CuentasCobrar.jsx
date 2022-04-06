import { Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateTitulo } from '../../../Reducers/tituloReducer'
import { CuentasAdaptarDG } from '../../../Utils/adaptadores'
import { CuentasColumns } from '../../../Utils/columns'
import Button from '../../athomic-components/Button'
import TextInput from '../../athomic-components/TextInput'
import ClienteListModal from './ClienteListModal'
import EmitirPagoModal from './EmitirPagoModal'

const CuentasCobrar = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateTitulo('Cuentas por cobrar'))
  }, [dispatch])

  const [cliente, setCliente] = useState(null)
  const [openClienteListModal, setOpenClienteListModal] = useState(false)
  const [openEmitirPagoModal, setOpenEmitirPagoModal] = useState(false)
  const historiales = () => {
    const historiales = useSelector(state => {return state.historialPagos })
    if(cliente !== null) {
      const lista = historiales.filter(historial => historial.Cliente.ID === cliente.ID)
      if(lista.length!==0) {
        return [lista[(lista.length)-1]].filter(historial => historial.Pendiente)
      }
      else{
        return []
      }
    }
    return []
  }
  const ultimoPago = historiales()
  const [selectionModel, setSelectionModel] = useState([])

  return (
    <>
      { openClienteListModal ? <ClienteListModal setCliente={setCliente} setOpenClienteListModal={setOpenClienteListModal} /> : null}
      { openEmitirPagoModal ? <EmitirPagoModal ultimoPago={ultimoPago} cliente={cliente} setOpenEmitirPagoModal={setOpenEmitirPagoModal} /> : null}
      <TextInput disable={true} moreSx={{ width: '68%' }} value={cliente ? cliente.Nombre +' (Ced.:'+cliente.Cedula+')' : ''} label={'Cliente'} />
      <Button onClick={() => setOpenClienteListModal(true)} moreSx={{ width: '30%', height: '56px', marginLeft: '2%' }} color={'warning'} text={'Buscar'} />
      <div style={{ height: 'calc(100vh - 270px)', minHeight: '100px', width: '100%', marginTop: 10 }} >
        <DataGrid
          rows={historiales().map(item => CuentasAdaptarDG(item))}
          columns={CuentasColumns}
          SelectionMode='Single'
          disableMultipleSelection
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel)
          }}
          selectionModel={selectionModel}
        />
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button onClick={() => setOpenEmitirPagoModal(!openEmitirPagoModal)} text={'Realizar pago'} color='success' />
        </Grid>
      </Grid>
    </>
  )
}

export default CuentasCobrar