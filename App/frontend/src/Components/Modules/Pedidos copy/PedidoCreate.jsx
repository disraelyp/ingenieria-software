import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateTitulo } from '../../../Reducers/tituloReducer'
import useField from '../../../Hooks/useField'

import { PedidoCreateColumns } from '../../../Utils/columns'
import { DataGrid } from '@mui/x-data-grid'
import { itemForm } from '../../../Styles/gridForm'
import { FormHelperText, Grid } from '@mui/material'
import TextInput from '../../athomic-components/TextInput'
import Button from '../../athomic-components/Button'
import SelectInput from '../../athomic-components/SelectInput'
import { codigoValidate, cantidadValidate, precioOptionesValidate } from '../../../Utils/validaciones'
import { useHistory } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

//export const PedidoCreateColumns = [
//{ field: 'Codigo', headerName: 'Codigo', width: 150 },
//{ field: 'Descripcion', headerName: 'Descripcion', minWidth: 100, flex: 1  },
//{ field: 'Precio', headerName: 'Precio', minWidth: 50, flex: 1  },
//{ field: 'Total', headerName: 'Total', minWidth: 100, flex: 1  },
//]

const ProductoPanel = ({ agregarFila, modificarFila, deleteRow, rows }) => {

  const [OpcionesPrecios, setOpcionesPrecios] = useState([])
  const history = useHistory()

  const productos = useSelector(state => { return state.productos })

  const Codigo = useField('text', '', codigoValidate)
  const Descripcion = useField('text', '', codigoValidate)
  const Cantidad = useField('number', '', cantidadValidate)
  const Precio = useField('number', 0, precioOptionesValidate)

  const adapterPrecios = (precios) => {
    return [
      { label: 'RD$ ' + (precios[0].Precio + precios[0].Impuesto), value: 0 },
      { label: 'RD$ ' + (precios[1].Precio + precios[1].Impuesto), value: 1 },
      { label: 'RD$ ' + (precios[2].Precio + precios[2].Impuesto), value: 2 },
    ]
  }

  const onSubmitCodigo = (event) => {
    event.preventDefault()
    const producto = productos.find(producto => producto.CodigoBarra === Codigo.form.value)
    if(producto) {
      //agregarFila(Codigo, Descripcion, Cantidad, Precio, Total, Impuesto)
      agregarFila(producto.CodigoBarra, producto.Descripcion, 1, producto.Precios[0].Precio, producto.Precios[0].Precio+producto.Precios[0].Impuesto, producto.Precios[0].Impuesto)
      Descripcion.functions.setValue(producto.Descripcion)
      setOpcionesPrecios(adapterPrecios(producto.Precios))
      Precio.functions.setValue(0)
      Cantidad.functions.setValue(1)
    } else {
      Codigo.functions.createError('Ingrese un codigo correcto.')
      Descripcion.functions.setValue('')
      setOpcionesPrecios([])
      Cantidad.functions.setValue(0)
    }
    if(Codigo.functions.value === '') {
      setOpcionesPrecios([])
    }
    Codigo.functions.setValue('')
  }

  const validate = () => {
    Cantidad.functions.validate()
    Precio.functions.validate()
  }

  const isValidate = () => {
    return Cantidad.functions.isValidate() &&  Precio.functions.isValidate()
  }

  const onChange = (event) => {
    event.preventDefault()
    const producto = productos.find(producto => producto.Descripcion === Descripcion.form.value)
    if (producto) {
      if (isValidate()){
        modificarFila(producto.CodigoBarra, producto.Descripcion, parseInt(Cantidad.form.value), producto.Precios[Precio.form.value].Precio, producto.Precios[Precio.form.value].Precio+producto.Precios[Precio.form.value].Impuesto, producto.Precios[Precio.form.value].Impuesto)
      } else {
        validate()
      }

    } else {
      Codigo.functions.createError('Ingrese un codigo correcto.')
      Descripcion.functions.setValue('')
      Cantidad.functions.setValue(1)
    }
  }


  const subtotal = () => {
    let total =0
    rows.map(row => total += row.Precio * row.Cantidad)
    return 'RD$ '+total
  }
  const impuestos = () => {
    let total =0
    rows.map(row => total += row.Impuesto * row.Cantidad)
    return 'RD$ '+total
  }
  const total = () => {
    let total =0
    rows.map(row => total += (row.Precio + row.Impuesto) * row.Cantidad)
    return 'RD$ '+total
  }



  return (
    <div style={{ height: 'calc(100vh - 230px)', width: '100%', margin: '10px', maxWidth: '500px' }}>
      <div style={{ border: '1px solid rgba(224, 224, 224, 1)', borderRadius: '4px', width: '100%', marginBottom: '50px' }}>
        <form onSubmit={onSubmitCodigo}>
          <TextInput moreSx={{ width: '96%', marginLeft: '2%', marginTop: 1 }} { ...Codigo.form } label={'Codigo'} />
        </form>
        <form onChange={onChange}>
          <TextInput moreSx={{ width: '96%', marginLeft: '2%' }} { ...Descripcion.form } disable={true} label={'Descripcion'} />
          <TextInput moreSx={{ width: '30%', marginLeft: '2%' }} { ...Cantidad.form } label={'Cantidad'} />
          <SelectInput moreSx={{ width: '46%', marginLeft: '4%' }} { ...Precio.form } label={'Precios'} text={'Seleccione un precio'} options={OpcionesPrecios} />
          <IconButton onClick={() => deleteRow()} aria-label="delete" sx={{ marginTop: '10px', marginLeft: '5%' }}>
            <DeleteIcon />
          </IconButton>
        </form>
      </div>

      <FormHelperText >Subtotal </FormHelperText>
      <TextInput moreSx={{ width: '100%' }} disable={true} value={subtotal()} />

      <FormHelperText >Impuestos </FormHelperText>
      <TextInput moreSx={{ width: '100%' }} disable={true} value={impuestos()}  />

      <FormHelperText >Total a pagar </FormHelperText>
      <TextInput moreSx={{ width: '100%' }} disable={true} value={total()}  />


      <Button  onClick={() => history.push('/Factuacion/Pedidos')} color={'error'} text={'Guardar'} />
      <Button  onClick={() => history.push('/Factuacion/Pedidos')} color={'success'} text={'Salir'} />
    </div>
  )
}

const PedidoCreate = () => {

  const dispatch = useDispatch()

  const [selectionModel, setSelectionModel] = useState([])
  const [rows, setRows] = useState(() => [])

  useEffect(() => {
    dispatch(updateTitulo('Crear Pedido'))
  }, [dispatch])

  const agregarFila = (Codigo, Descripcion, Cantidad, Precio, Total, Impuesto) => {
    const row = rows.find(row => row.Codigo === Codigo)
    if(row) {
      setRows((prevRows) => prevRows.map(row => row.Codigo === Codigo ? { id: row.id, Impuesto: Impuesto, Cantidad: parseInt(Cantidad+row.Cantidad), Codigo: Codigo, Descripcion: Descripcion, Precio: Precio, Total: Total } : row ))
    } else {
      setRows((prevRows) => [...prevRows, { id: prevRows.length, Impuesto: Impuesto,Cantidad: parseInt(Cantidad), Codigo: Codigo, Descripcion: Descripcion, Precio: Precio, Total: Total }])
    }
  }

  const modificarFila = (Codigo, Descripcion, Cantidad, Precio, Total, Impuesto) => {
    setRows((prevRows) => prevRows.map(row => row.Codigo === Codigo ? { id: row.id, Impuesto: Impuesto, Cantidad: parseInt(Cantidad+1), Codigo: Codigo, Descripcion: Descripcion, Precio: Precio, Total: Total } : row ))
  }

  const deleteRow = () => {
    setRows(rows.filter(row => row.id !== selectionModel[0]))
  }



  return (
    <>


      <Grid sx={{ width: '100%' }} container spacing={0} direction='column' alignItems='center' justifyContent='center'>

        <Grid item xs={12} sx={itemForm()}>
          <div style={{ height: 'calc(100vh - 230px)',  width: '100%', margin: '10px', maxWidth: '1000px' }} >
            <DataGrid
              rows={rows}
              columns={PedidoCreateColumns}
              SelectionMode='Single'
              hideFooterPagination
              disableMultipleSelection
              onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel)
              }}
              selectionModel={selectionModel}
            />
          </div>
          <ProductoPanel agregarFila={agregarFila} modificarFila={modificarFila} rows={rows} deleteRow={deleteRow} />
        </Grid>
      </Grid>

    </>
  )
}

export default PedidoCreate