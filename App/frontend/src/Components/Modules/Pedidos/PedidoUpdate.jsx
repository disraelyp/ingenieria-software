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
import { useHistory, useParams } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch'
import ClienteListModal from './ClienteListModal'
import ProductoListModal from './ProductoListModal'
import DoneIcon from '@mui/icons-material/Done'
import { createNotification } from '../../../Reducers/notificacionesReducer'
import { initializePedidos } from '../../../Reducers/pedidosReducer'
import pedidoService from '../../../Services/pedido'
import NotFound from '../../Utils/NotFound'


const ProductoPanel = ({ id, setOnChangeSelect, cliente, agregarFila, modificarFila, deleteRow, rows, selectRow, onChangeSelect }) => {

  const history = useHistory()
  const dispatch = useDispatch()
  const productos = useSelector(state => { return state.productos })
  const [openProductoListModal, setOpenProductoListModal] = useState(false)
  const [OpcionesPrecios, setOpcionesPrecios] = useState([])
  const Codigo = useField('text', '', codigoValidate)
  const Descripcion = useField('text', '', codigoValidate)
  const Cantidad = useField('number', '', cantidadValidate)
  const Precio = useField('number', 0, precioOptionesValidate)

  const actualizarPedido = async (event) => {
    event.preventDefault()
    if(cliente !== null) {
      if(rows.length !== 0) {
        const nuevoPedido = {
          Productos: rows.map(a => {return { 'Producto': productos.find(b => b.CodigoBarra === a.Codigo).ID, 'Cantidad': a.Cantidad, 'Precio': a.Precio, 'Impuesto': a.Impuesto }})
        }
        const pedido = await pedidoService.update(parseInt(id), nuevoPedido)
        if(pedido.data.error){
          console.log(pedido.data.message)
        } else {
          dispatch(initializePedidos())
          dispatch(createNotification('Pedido modificado correctamente!', 'Información'))
          history.push('/Facturacion/Pedidos')
        }
      } else {
        dispatch(createNotification('Necesita ingresar almenos un producto.', 'Error'))
      }
    } else {
      dispatch(createNotification('Necesita ingresar un cliente, para crear un pedido.', 'Error'))
    }
  }

  const onModification = (event) => {
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

  const onChangeCodigo = (producto) => {
    Descripcion.functions.setValue(producto.Descripcion)
    setOpcionesPrecios(adapterPrecios(producto.Precios))
    Precio.functions.setValue(((adapterPrecios(producto.Precios)).find(precio => precio.label === 'RD$ '+(selectRow.Precio+selectRow.Impuesto))) ? ((adapterPrecios(producto.Precios)).find(precio => precio.label === 'RD$ '+(selectRow.Precio+selectRow.Impuesto))).value : 0)
    Cantidad.functions.setValue(producto.Cantidad)
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
            <SelectInput moreSx={{ width: '40%', marginLeft: '4%' }} { ...Precio.form } label={'Precios'} text={'Seleccione un precio'} options={OpcionesPrecios} />
            <IconButton type='submit' sx={{ marginTop: '8px', marginLeft: '5%' }}>
              <DoneIcon fontSize='large' />
            </IconButton>
            <IconButton onClick={() => deleteRow()} sx={{ marginTop: '8px', marginLeft: '5%' }}>
              <DeleteIcon fontSize='large' />
            </IconButton>
          </form>
        </div>
        <form onSubmit={actualizarPedido}>
          <FormHelperText >Subtotal </FormHelperText>
          <TextInput moreSx={{ width: '100%' }} disable={true} value={subtotal()} />
          <FormHelperText >Impuestos </FormHelperText>
          <TextInput moreSx={{ width: '100%' }} disable={true} value={impuestos()}  />
          <FormHelperText >Total a pagar </FormHelperText>
          <TextInput moreSx={{ width: '100%' }} disable={true} value={total()}  />
          <Button submit={true} color={'success'} text={'Crear'} />
        </form>
        <Button  onClick={() => history.push('/Facturacion/Pedidos')} color={'error'} text={'Salir'} />
      </div>
    </>

  )
}

const PedidoUpdate = () => {

  const id = useParams().id
  const dispatch = useDispatch()
  const [openClienteListModal, setOpenClienteListModal] = useState(false)
  const [onChangeSelect, setOnChangeSelect] = useState(false)

  const pedidos = useSelector(state => { return state.pedidos })
  const pedido = pedidos.find(pedido => parseInt(pedido.ID) === parseInt(id))

  const cliente = pedido.Cliente
  const [selectionModel, setSelectionModel] = useState([])
  const [rows, setRows] = useState(() => [])
  let [charge, setCharge] = useState(false)
  const selectRow = rows[selectionModel]

  useEffect(() => {
    dispatch(updateTitulo('Modificar Pedido'))
  }, [dispatch])

  const updateRow = () => {
    setRows((prevRows) => prevRows.map(row => {return { ...row, Total: (row.Impuesto+row.Precio)*row.Cantidad }}))
  }

  const agregarFila = (Codigo, Descripcion, Cantidad, Precio, Total, Impuesto) => {
    const row = rows.find(row => row.Codigo === Codigo)
    if(row) {
      setRows((prevRows) => prevRows.map(row => row.Codigo === Codigo ? { id: row.id, Impuesto: Impuesto, Cantidad: parseInt(Cantidad+row.Cantidad), Codigo: Codigo, Descripcion: Descripcion, Precio: Precio, Total: Total } : row ))
    } else {
      setRows((prevRows) => [...prevRows, { id: prevRows.length, Impuesto: Impuesto,Cantidad: parseInt(Cantidad), Codigo: Codigo, Descripcion: Descripcion, Precio: Precio, Total: Total }])
    }
    updateRow()
  }

  const modificarFila = (Codigo, Descripcion, Cantidad, Precio, Total, Impuesto) => {
    setRows((prevRows) => prevRows.map(row => row.Codigo === Codigo ? { id: row.id, Impuesto: Impuesto, Cantidad: parseInt(Cantidad), Codigo: Codigo, Descripcion: Descripcion, Precio: Precio, Total: Total } : row ))
    updateRow()
  }

  const deleteRow = () => {
    setRows(rows.filter(row => row.id !== selectionModel[0]))
    updateRow()
  }


  if(!pedido){
    return <NotFound />
  } else {
    if(!charge) {
      pedido.Productos.map(producto => agregarFila(producto.CodigoBarra, producto.Descripcion, producto.Cantidad, producto.Precio, producto.Cantidad*(producto.Precio+producto.Impuesto), producto.Impuesto))
      setCharge(true)
    }
  }

  return (
    <>
      { openClienteListModal ? <ClienteListModal setOpenClienteListModal={setOpenClienteListModal} /> : null}
      <Grid sx={{ width: '100%' }} container spacing={0} direction='column' alignItems='center' justifyContent='center'>
        <Grid item xs={12} sx={{ width: '94%' }}>
          <TextInput disable={true} moreSx={{ width: '68%' }} value={cliente ? cliente.Nombre +' (Ced.:'+cliente.Cedula+')' : ''} label={'Cliente'} />
          <Button disable={true} moreSx={{ width: '30%', height: '56px', marginLeft: '2%' }} color={'warning'} text={'Buscar'} />
        </Grid>
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
                setOnChangeSelect(true)
              }}
              selectionModel={selectionModel}
            />
          </div>
          <ProductoPanel id={id} selectRow={selectRow} cliente={cliente} setOnChangeSelect={setOnChangeSelect} onChangeSelect={onChangeSelect} agregarFila={agregarFila} modificarFila={modificarFila} rows={rows} deleteRow={deleteRow} />
        </Grid>
      </Grid>
    </>
  )
}

export default PedidoUpdate