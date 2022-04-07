import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateTitulo } from '../../../Reducers/tituloReducer'
import useField from '../../../Hooks/useField'
import { CompraCreateColumns } from '../../../Utils/columns'
import { DataGrid } from '@mui/x-data-grid'
import { itemForm } from '../../../Styles/gridForm'
import { FormHelperText, Grid } from '@mui/material'
import TextInput from '../../athomic-components/TextInput'
import Button from '../../athomic-components/Button'
import { codigoValidate, cantidadValidate, terminoPagoValidate } from '../../../Utils/validaciones'
import { useHistory } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch'
import ProveedorListModal from './ProveedorListModal'
import ProductoListModal from './ProductoListModal'
import DoneIcon from '@mui/icons-material/Done'
import { createNotification } from '../../../Reducers/notificacionesReducer'
import { initializeCompras } from '../../../Reducers/comprasReducer'
import compraServices from '../../../Services/compra'
import SelectInput from '../../athomic-components/SelectInput'


const ProductoPanel = ({ setOnChangeSelect, proveedor, agregarFila, modificarFila, deleteRow, rows, selectRow, onChangeSelect }) => {

  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const productos = useSelector(state => { return state.productos })
  const [openProductoListModal, setOpenProductoListModal] = useState(false)
  const Codigo = useField('text', '', codigoValidate)
  const Descripcion = useField('text', '', codigoValidate)
  const Cantidad = useField('number', '', cantidadValidate)
  const Costo = useField('number', '', cantidadValidate)
  const termino = useField('number', 0, terminoPagoValidate)

  const terminoPago = [
    { label: 'Efectivo', value: 0 },
    { label: 'Credito a 15 Dias', value: 1 },
    { label: 'Credito a 30 Dias', value: 2 },
    { label: 'Credito a 45 Dias', value: 3 },
  ]

  const crearCompra = async (event) => {
    event.preventDefault()
    if(proveedor !== null) {
      if(rows.length !== 0) {
        const nuevaCompra  = {
          Proveedor: proveedor.ID,
          Comprador: user.user.Nombre,
          Termino: terminoPago[termino.form.value].label,
          Productos: rows.map(a => {return { 'Producto': productos.find(b => b.CodigoBarra === a.Codigo).ID, 'Cantidad': a.Cantidad, 'Costo': a.Costo }})
        }
        const compra = await compraServices.create(nuevaCompra)
        if(compra.data.error){
          console.log(compra.data.message)
        } else {
          dispatch(initializeCompras())
          dispatch(createNotification('Compra creada correctamente!', 'Información'))
          history.push('/Inventario/Compras')
        }
      } else {
        dispatch(createNotification('Necesita ingresar almenos un producto.', 'Error'))
      }
    } else {
      dispatch(createNotification('Necesita ingresar un proveedor, para crear una compra.', 'Error'))
    }
  }

  const onModification = (event) => {
    event.preventDefault()
    const producto = productos.find(producto => producto.Descripcion === Descripcion.form.value)
    if (producto) {
      if (isValidate()){
        modificarFila(producto.CodigoBarra, producto.Descripcion, parseInt(Cantidad.form.value), parseInt(Costo.form.value))
      } else {
        validate()
      }
    } else {
      Codigo.functions.createError('Ingrese un codigo correcto.')
      Descripcion.functions.setValue('')
      Cantidad.functions.setValue(1)
    }
  }

  const onSubmitCodigo = (event) => {
    event.preventDefault()
    const producto = productos.find(producto => producto.CodigoBarra === Codigo.form.value)
    if(producto) {
      agregarFila(producto.CodigoBarra, producto.Descripcion, 1, producto.Costo, producto.Costo)
      Descripcion.functions.setValue(producto.Descripcion)
      Costo.functions.setValue(producto.Costo)
      Cantidad.functions.setValue(1)
    } else {
      Codigo.functions.createError('Ingrese un codigo correcto.')
      Descripcion.functions.setValue('')
      Cantidad.functions.setValue(0)
      Costo.functions.setValue(0)
    }
    Codigo.functions.setValue('')
  }

  const validate = () => {
    Cantidad.functions.validate()
    Costo.functions.validate()
  }

  const isValidate = () => {
    return Cantidad.functions.isValidate() &&  Costo.functions.isValidate()
  }

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

  const onChangeCodigo = (producto) => {
    Descripcion.functions.setValue(producto.Descripcion)
    Cantidad.functions.setValue(producto.Cantidad)
    Costo.functions.setValue(producto.Costo)
  }

  if(onChangeSelect && selectRow.Descripcion) {
    if(selectRow.Descripcion && Descripcion.form.value !== selectRow.Descripcion) {
      if(productos.find(producto => producto.Descripcion === selectRow.Descripcion)){
        onChangeCodigo({ ...productos.find(producto => producto.Descripcion === selectRow.Descripcion), Cantidad: selectRow.Cantidad })
      }
    }
    setOnChangeSelect(false)
  }

  return (
    <>
      { openProductoListModal ? <ProductoListModal setProducto={Codigo.functions.setValue} setOpenProductoListModal={setOpenProductoListModal} /> : null}
      <div style={{ height: 'calc(100vh - 230px)', width: '100%', margin: '10px', maxWidth: '500px' }}>
        <div style={{ border: '1px solid rgba(224, 224, 224, 1)', borderRadius: '4px', width: '100%', marginBottom: '15px' }}>
          <form onSubmit={onSubmitCodigo}>
            <TextInput moreSx={{ width: '80%', marginLeft: '2%', marginTop: 2 }} { ...Codigo.form } label={'Codigo'} />
            <IconButton onClick={() => setOpenProductoListModal(true)} sx={{ marginTop: '25px', marginLeft: '4%' }} aria-label='buscar'>
              <ContentPasteSearchIcon fontSize='large' />
            </IconButton>
          </form>
        </div>
        <div style={{ border: '1px solid rgba(224, 224, 224, 1)', borderRadius: '4px', width: '100%', marginBottom: '10px' }}>
          <form onSubmit={onModification}>
            <TextInput moreSx={{ width: '96%', marginLeft: '2%', marginTop: 2 }} { ...Descripcion.form } disable={true} label={'Descripcion'} />
            <TextInput moreSx={{ width: '20%', marginLeft: '2%' }} { ...Cantidad.form } label={'Cantidad'} />
            <TextInput moreSx={{ width: '40%', marginLeft: '2%' }} { ...Costo.form } label={'Costo'} />
            <IconButton type='submit' sx={{ marginTop: '8px', marginLeft: '5%' }}>
              <DoneIcon fontSize='large' />
            </IconButton>
            <IconButton onClick={() => deleteRow()} sx={{ marginTop: '8px', marginLeft: '5%' }}>
              <DeleteIcon fontSize='large' />
            </IconButton>
          </form>
        </div>
        <SelectInput { ...termino.form } options={terminoPago} label={'Termino de pago'} text={'Seleccionte un termino de pago'} />
        <form onSubmit={crearCompra}>
          <FormHelperText >Subtotal </FormHelperText>
          <TextInput moreSx={{ width: '100%' }} disable={true} value={subtotal()} />
          <FormHelperText >Total a pagar </FormHelperText>
          <TextInput moreSx={{ width: '100%' }} disable={true} value={total()}  />
          <Button submit={true} color={'success'} text={'Crear'} />
        </form>
        <Button  onClick={() => history.push('/Inventario/Compras')} color={'error'} text={'Salir'} />
      </div>
    </>

  )
}

const CompraCreate = () => {

  const dispatch = useDispatch()
  const [proveedor, setProveedor] = useState(null)
  const [openProveedorListModal, setOpenProveedorListModal] = useState(false)
  const [selectionModel, setSelectionModel] = useState([])
  const [rows, setRows] = useState(() => [])
  const selectRow = rows[selectionModel]
  const [onChangeSelect, setOnChangeSelect] = useState(false)

  useEffect(() => {
    dispatch(updateTitulo('Crear compra'))
  }, [dispatch])

  const updateRow = () => {
    setRows((prevRows) => prevRows.map(row => {return { ...row, Total: row.Costo*row.Cantidad }}))
  }

  const agregarFila = (Codigo, Descripcion, Cantidad, Costo, Total) => {
    const row = rows.find(row => row.Codigo === Codigo)
    if(row) {
      setRows((prevRows) => prevRows.map(row => row.Codigo === Codigo ? { id: row.id, Cantidad: parseInt(Cantidad+row.Cantidad), Codigo: Codigo, Descripcion: Descripcion, Costo: Costo, Total: Total } : row ))
    } else {
      setRows((prevRows) => [...prevRows, { id: prevRows.length, Cantidad: parseInt(Cantidad), Codigo: Codigo, Descripcion: Descripcion, Costo: Costo, Total: Total }])
    }
    updateRow()
  }

  const modificarFila = (Codigo, Descripcion, Cantidad, Costo, Total) => {
    setRows((prevRows) => prevRows.map(row => row.Codigo === Codigo ? { id: row.id, Cantidad: parseInt(Cantidad), Codigo: Codigo, Descripcion: Descripcion, Costo: Costo, Total: Total } : row ))
    updateRow()
  }

  const deleteRow = () => {
    setRows(rows.filter(row => row.id !== selectionModel[0]))
    updateRow()
  }

  return (
    <>
      { openProveedorListModal ? <ProveedorListModal setProveedor={setProveedor} setOpenProveedorListModal={setOpenProveedorListModal} /> : null}
      <Grid sx={{ width: '100%' }} container spacing={0} direction='column' alignItems='center' justifyContent='center'>
        <Grid item xs={12} sx={{ width: '94%' }}>
          <TextInput disable={true} moreSx={{ width: '68%' }} value={proveedor ? proveedor.Nombre +' (RNC.:'+proveedor.RNC+')' : ''} label={'Proveedor'} />
          <Button onClick={() => setOpenProveedorListModal(true)} moreSx={{ width: '30%', height: '56px', marginLeft: '2%' }} color={'warning'} text={'Buscar'} />
        </Grid>
        <Grid item xs={12} sx={itemForm()}>
          <div style={{ height: 'calc(100vh - 230px)',  width: '100%', margin: '10px', maxWidth: '1000px' }} >
            <DataGrid
              rows={rows}
              columns={CompraCreateColumns}
              SelectionMode='Single'
              hideFooterPagination
              disableMultipleSelection
              onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel)
                setOnChangeSelect(true)
              }}
              selectionModel={selectionModel}
            />
          </div>
          <ProductoPanel selectRow={selectRow} proveedor={proveedor} setOnChangeSelect={setOnChangeSelect} onChangeSelect={onChangeSelect} agregarFila={agregarFila} modificarFila={modificarFila} rows={rows} deleteRow={deleteRow} />
        </Grid>
      </Grid>
    </>
  )
}

export default CompraCreate