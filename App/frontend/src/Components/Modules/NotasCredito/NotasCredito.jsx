import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateTitulo } from '../../../Reducers/tituloReducer'
import { panelMain } from '../../../Styles/panelMain'
import { DevolucionesAdaptarDG } from '../../../Utils/adaptadores'
import { DevolucionesColumns } from '../../../Utils/columns'
import Button from '../../athomic-components/Button'
import TextInput from '../../athomic-components/TextInput'
import ClienteListModal from './ClienteListModal'

const NotasCredito = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateTitulo('Notas de creditos pendientes'))
  }, [dispatch])

  const [cliente, setCliente] = useState(null)
  const [openClienteListModal, setOpenClienteListModal] = useState(false)

  const devoluciones = () => {
    const devoluciones = (useSelector(state => {return state.devoluciones })).filter(devolucion => !devolucion.Pagado)
    if(cliente !== null) {
      return devoluciones.filter(historial => historial.Cliente.ID === cliente.ID)
    }
    return devoluciones
  }

  const [selectionModel, setSelectionModel] = useState([])

  return (
    <>
      { openClienteListModal ? <ClienteListModal setCliente={setCliente} setOpenClienteListModal={setOpenClienteListModal} /> : null}
      <TextInput disable={true} moreSx={{ width: '68%' }} value={cliente ? cliente.Nombre +' (Ced.:'+cliente.Cedula+')' : ''} label={'Cliente'} />
      <Button onClick={() => setOpenClienteListModal(true)} moreSx={{ width: '30%', height: '56px', marginLeft: '2%' }} color={'warning'} text={'Buscar'} />
      <div style={panelMain()} >
        <DataGrid
          rows={devoluciones().map(item => DevolucionesAdaptarDG(item))}
          columns={DevolucionesColumns}
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

export default NotasCredito