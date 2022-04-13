import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useField from '../../../Hooks/useField'
import { clientesAdapterSI, PedidosAdaptarDG } from '../../../Utils/adaptadores'
import { PedidosColumns } from '../../../Utils/columns'
import { verificadorFechas } from '../../../Utils/verificadorFechas'
import { Typography } from '@mui/material'
import { Grid } from '@mui/material'
import SelectInput from '../../athomic-components/SelectInput'
import DateInput from '../../athomic-components/DateInput'
import { DataGrid } from '@mui/x-data-grid'
import useDatePicker from '../../../Hooks/useDatePicker'
import { dateConverter } from '../../../Utils/dateConverter'
import { conductorValidate } from '../../../Utils/validaciones'
import { removeDuplicate } from '../../../Utils/deleteDuplicates'
import { panelReport } from '../../../Styles/panelMain'
import { updateTitulo } from '../../../Reducers/tituloReducer'

const VentasCliente = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateTitulo('Reportes'))
  }, [dispatch])

  const pedidos = useSelector(state => { return state.pedidos })
  const clientes = removeDuplicate(pedidos.map(pedido => pedido.Cliente))

  const [selectionModel, setSelectionModel] = useState([])
  const Cliente = useField('number', 0, conductorValidate)
  const Inicio = useDatePicker('date', new Date())
  const Fin = useDatePicker('date', new Date())

  const pedidosFiltrado = () => {
    const ClientesViajes = pedidos.filter(viaje => verificadorFechas(dateConverter(Inicio.form.value), dateConverter(Fin.form.value), viaje.FechaCreacion))
    if(Cliente.form.value === 0) {
      return ClientesViajes
    }
    return ClientesViajes.filter(pedido => pedido.Cliente.ID === Cliente.form.value)
  }

  const totalPedido = (item) => {
    let total = 0
    item.Productos.map(producto => total += producto.Cantidad * (producto.Precio + producto.Impuesto))
    return total
  }

  const total = () => {
    const numeros = pedidosFiltrado().map(pedidp => totalPedido(pedidp))
    if (numeros.length !== 0) {
      return (numeros.reduce((pv, cv) => pv+cv)).toFixed(2)
    }
    return 0
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <SelectInput { ...Cliente.form } options={clientes.map(cliente => clientesAdapterSI(cliente))} text={'Seleccione un cliente'} label={'Cliente'} />
          </Grid>
          <Grid item xs={3}>
            <DateInput {...Inicio.form} disablePast={true} label={'Fecha de partida'}/>
          </Grid>
          <Grid item xs={3}>
            <DateInput {...Fin.form} disablePast={true}  label={'Fecha de llegada'} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <div style={panelReport()} >
          <DataGrid
            rows={pedidosFiltrado().map(item => PedidosAdaptarDG(item))}
            columns={PedidosColumns}
            SelectionMode='Single'
            disableMultipleSelection
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel)
            }}
            selectionModel={selectionModel}
          />
        </div>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography variant='h5' sx={{ margin: 2.5 }}>Total: {total()}</Typography>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </Grid>
  )
}

export default VentasCliente