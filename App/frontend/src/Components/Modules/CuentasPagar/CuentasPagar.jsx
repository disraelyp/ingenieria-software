import { Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateTitulo } from '../../../Reducers/tituloReducer'
import { ComprasAdaptarDG } from '../../../Utils/adaptadores'
import { ComprasColumns } from '../../../Utils/columns'
import Button from '../../athomic-components/Button'
import TextInput from '../../athomic-components/TextInput'
import PagoModal from './PagoModal'
import ProveedorListModal from './ProveedorListModal'

const CuentasPagar = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateTitulo('Cuentas por pagar'))
  }, [dispatch])

  const [proveedor, setProveedor] = useState(null)
  const [proveedorListModal, setOpenProveedorListModal] = useState(false)
  const [openPagoModal, setOpenPagoModal] = useState(false)

  const compras = () => {
    const compras = (useSelector(state => {return state.compras })).filter(compra => !compra.Pagado)
    if(proveedor !== null) {
      const lista = compras.filter(historial => historial.Cliente.ID === proveedor.ID)
      if(lista.length!==0) {
        return lista.filter(historial => historial.Pagado)
      }
      else{
        return []
      }
    }
    return compras
  }

  const [selectionModel, setSelectionModel] = useState([])

  return (
    <>
      { openPagoModal ? <PagoModal id={selectionModel[0]} setOpenPagoModal={setOpenPagoModal} /> : null}
      { proveedorListModal ? <ProveedorListModal setProveedor={setProveedor} setOpenProveedorListModal={setOpenProveedorListModal} /> : null}
      <TextInput disable={true} moreSx={{ width: '68%' }} value={proveedor ? proveedor.Nombre +' (RNC.:'+proveedor.RNC+')' : ''} label={'Proveedor'} />
      <Button onClick={() => setOpenProveedorListModal(true)} moreSx={{ width: '30%', height: '56px', marginLeft: '2%' }} color={'warning'} text={'Buscar'} />
      <div style={{ height: 'calc(100vh - 270px)', minHeight: '100px', width: '100%', marginTop: 10 }} >
        <DataGrid
          rows={compras().map(item => ComprasAdaptarDG(item))}
          columns={ComprasColumns}
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
          <Button onClick={() => setOpenPagoModal(!openPagoModal)} text={'Realizar pago'} color='success' />
        </Grid>
      </Grid>
    </>
  )
}

export default CuentasPagar