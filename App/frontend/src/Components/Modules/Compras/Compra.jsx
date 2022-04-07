import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateTitulo } from '../../../Reducers/tituloReducer'
import useField from '../../../Hooks/useField'
import useDatePicker from '../../../Hooks/useDatePicker'
import { CompraCreateColumns } from '../../../Utils/columns'
import { DataGrid } from '@mui/x-data-grid'
import { itemForm } from '../../../Styles/gridForm'
import { FormHelperText, Grid } from '@mui/material'
import TextInput from '../../athomic-components/TextInput'
import DateInput from '../../athomic-components/DateInput'
import Button from '../../athomic-components/Button'
import { codigoValidate, cantidadValidate } from '../../../Utils/validaciones'
import { useHistory, useParams } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch'
import DoneIcon from '@mui/icons-material/Done'
import NotFound from '../../Utils/NotFound'



const ProductoPanel = ({ rows }) => {

  const history = useHistory()
  const Codigo = useField('text', '', () => { return null })
  const Descripcion = useField('text', '', codigoValidate)
  const Cantidad = useField('number', '', cantidadValidate)
  const Costo = useField('number', '', cantidadValidate)

  const subtotal = () => {
    let total =0
    rows.map(row => total += row.Costo * row.Cantidad)
    return 'RD$ '+total
  }

  const total = () => {
    let total =0
    rows.map(row => total += row.Costo * row.Cantidad)
    return 'RD$ '+total
  }

  return (
    <>
      <div style={{ height: 'calc(100vh - 230px)', width: '100%', margin: '10px', maxWidth: '500px' }}>
        <div style={{ border: '1px solid rgba(224, 224, 224, 1)', borderRadius: '4px', width: '100%', marginBottom: '15px' }}>
          <TextInput disable={true} moreSx={{ width: '80%', marginLeft: '2%', marginTop: 2 }} { ...Codigo.form } label={'Codigo'} />
          <IconButton sx={{ marginTop: '25px', marginLeft: '4%' }} aria-label='buscar'>
            <ContentPasteSearchIcon fontSize='large' />
          </IconButton>
        </div>
        <div style={{ border: '1px solid rgba(224, 224, 224, 1)', borderRadius: '4px', width: '100%', marginBottom: '165px' }}>

          <TextInput moreSx={{ width: '96%', marginLeft: '2%', marginTop: 2 }} { ...Descripcion.form } disable={true} label={'Descripcion'} />
          <TextInput disable={true} moreSx={{ width: '20%', marginLeft: '2%' }} { ...Cantidad.form } label={'Cantidad'} />
          <TextInput disable={true} moreSx={{ width: '40%', marginLeft: '2%' }} { ...Costo.form } label={'Costo'} />

          <IconButton type='submit' sx={{ marginTop: '8px', marginLeft: '5%' }}>
            <DoneIcon fontSize='large' />
          </IconButton>
          <IconButton sx={{ marginTop: '8px', marginLeft: '5%' }}>
            <DeleteIcon fontSize='large' />
          </IconButton>
        </div>
        <FormHelperText >Subtotal </FormHelperText>
        <TextInput moreSx={{ width: '100%' }} disable={true} value={subtotal()} />
        <FormHelperText >Total a pagar </FormHelperText>
        <TextInput moreSx={{ width: '100%' }} disable={true} value={total()}  />
        <Button  onClick={() => history.push('/Inventario/Compras')} color={'error'} text={'Salir'} />
      </div>
    </>

  )
}

const Compra = () => {

  const id = useParams().id
  const dispatch = useDispatch()
  const [rows, setRows] = useState(() => [])
  const compras = useSelector(state => { return state.compras })
  const compra = compras.find(compra => parseInt(compra.ID) === parseInt(id))
  const proveedor = compra.Proveedor
  const Fecha = useDatePicker('date', compra.FechaCreacion, () => {return null})

  const agregarFila = (Codigo, Descripcion, Cantidad, Costo, Total) => {
    setRows((prevRows) => [...prevRows, { id: prevRows.length, Costo: Costo, Cantidad: parseInt(Cantidad), Codigo: Codigo, Descripcion: Descripcion, Total: Total }])
  }

  useEffect(() => {
    dispatch(updateTitulo('Ver compra'))
  }, [dispatch])


  if(!compra){
    return <NotFound />
  } else {
    if(rows.length === 0) {
      compra.Productos.map(producto => agregarFila(producto.CodigoBarra, producto.Descripcion, producto.Cantidad, producto.Costo, producto.Cantidad*producto.Costo))
    }
  }
  return (
    <>
      <Grid sx={{ width: '100%' }} container spacing={0} direction='column' alignItems='center' justifyContent='center'>
        <Grid item xs={12} sx={{ width: '94%' }}>
          <TextInput disable={true} moreSx={{ width: '68%' }} value={proveedor ? proveedor.Nombre +' (RNC.:'+proveedor.RNC+')' : ''} label={'Proveedor'} />
          <DateInput label={'Fecha'} disable={true} moreSx={{ width: '30%', height: '56px', marginLeft: '2%' }} { ...Fecha.form } />
        </Grid>
        <Grid item xs={12} sx={itemForm()}>
          <div style={{ height: 'calc(100vh - 230px)',  width: '100%', margin: '10px', maxWidth: '1000px' }} >
            <DataGrid
              disable={true}
              rows={rows}
              columns={CompraCreateColumns}
              SelectionMode='Single'
              hideFooterPagination
              disableMultipleSelection
            />
          </div>
          <ProductoPanel proveedor={proveedor} rows={rows} />
        </Grid>
      </Grid>
    </>
  )
}

export default Compra