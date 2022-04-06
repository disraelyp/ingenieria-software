import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateTitulo } from '../../../Reducers/tituloReducer'
import { panelMain } from '../../../Styles/panelMain'
import { HistorialesAdaptarDG } from '../../../Utils/adaptadores'
import { HistorialColumns } from '../../../Utils/columns'
import Button from '../../athomic-components/Button'
import TextInput from '../../athomic-components/TextInput'
import ClienteListModal from './ClienteListModal'

const HistorialPagos = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateTitulo('Historial de pagos'))
  }, [dispatch])

  const [cliente, setCliente] = useState(null)
  const [openClienteListModal, setOpenClienteListModal] = useState(false)
  const historiales = () => {
    const historiales = (useSelector(state => {return state.historialPagos })).filter(historial => historial.SaldoPagado !==0 )
    if(cliente !== null) {
      return historiales.filter(historial => historial.Cliente.ID === cliente.ID)
    }
    return historiales
  }
  const [selectionModel, setSelectionModel] = useState([])

  return (
    <>
      { openClienteListModal ? <ClienteListModal setCliente={setCliente} setOpenClienteListModal={setOpenClienteListModal} /> : null}
      <TextInput disable={true} moreSx={{ width: '68%' }} value={cliente ? cliente.Nombre +' (Ced.:'+cliente.Cedula+')' : ''} label={'Cliente'} />
      <Button onClick={() => setOpenClienteListModal(true)} moreSx={{ width: '30%', height: '56px', marginLeft: '2%' }} color={'warning'} text={'Buscar'} />
      <div style={panelMain()} >
        <DataGrid
          rows={historiales().map(item => HistorialesAdaptarDG(item))}
          columns={HistorialColumns}
          SelectionMode='Single'
          disableMultipleSelection
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel)
          }}
          selectionModel={selectionModel}
        />
      </div>
    </>
  )
}

export default HistorialPagos