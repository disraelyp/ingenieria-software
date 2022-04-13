import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useField from '../../../Hooks/useField'
import { proveedoresAdapterSI, ComprasAdaptarDG } from '../../../Utils/adaptadores'
import { ComprasColumns } from '../../../Utils/columns'
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

const ComprasProveedor = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateTitulo('Reportes'))
  }, [dispatch])

  const compras = useSelector(state => { return state.compras })
  const proveedores = removeDuplicate(compras.map(compra => compra.Proveedor))

  const [selectionModel, setSelectionModel] = useState([])
  const Proveedor = useField('number', 0, conductorValidate)
  const Inicio = useDatePicker('date', new Date())
  const Fin = useDatePicker('date', new Date())

  const comprasFiltradas = () => {
    const ProveedoresViajes = compras.filter(viaje => verificadorFechas(dateConverter(Inicio.form.value), dateConverter(Fin.form.value), viaje.FechaCreacion))
    if(Proveedor.form.value === 0) {
      return ProveedoresViajes
    }
    return ProveedoresViajes.filter(compra => compra.Proveedor.ID === Proveedor.form.value)
  }

  const totalCompra = (item) => {
    let total = 0
    item.Productos.map(producto => total += (producto.Cantidad * producto.Costo))
    return total
  }

  const total = () => {
    const numeros = comprasFiltradas().map(compra => totalCompra(compra))
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
            <SelectInput { ...Proveedor.form } options={proveedores.map(proveedor => proveedoresAdapterSI(proveedor))} text={'Seleccione un proveedor'} label={'Proveedor'} />
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
            rows={comprasFiltradas().map(item => ComprasAdaptarDG(item))}
            columns={ComprasColumns}
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

export default ComprasProveedor