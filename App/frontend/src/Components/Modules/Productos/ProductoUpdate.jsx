
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import useField from './../../../Hooks/useField'
import { categoriaProducto, impuestos, origenProducto } from './../../../Utils/options'
import { Grid } from '@mui/material'
import TextInput from './../../athomic-components/TextInput'
import SelectInput from './../../athomic-components/SelectInput'
import Button from './../../athomic-components/Button'
import SwitchInput from './../../athomic-components/Switch'
import { nombreValidate, categoriaValidate, origenValidate, precioValidate, impuestoValidate } from './../../../Utils/validaciones'
import { updateTitulo } from './../../../Reducers/tituloReducer'
import { inputForm, itemForm } from './../../../Styles/gridForm'
import useSwitch from './../../../Hooks/useSwitch'
import productoservices from './../../../Services/producto'
import { initializeProductos } from './../../../Reducers/productosReducer'
import { createNotification } from './../../../Reducers/notificacionesReducer'

const ProductoUpdate = () => {

  const id = useParams().id
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateTitulo('Actualizar producto'))
  }, [dispatch])

  const productos = useSelector(state => {return state.productos})
  const producto = productos.find(item => item.ID === parseInt(id))
  const CodigoBarra = useField('text', producto.CodigoBarra, nombreValidate)
  const Descripcion = useField('text', producto.Descripcion, nombreValidate)
  const Categoria = useField('number', categoriaProducto.find(item => item.label === producto.Categoria).value, categoriaValidate)
  const Origen = useField('number', origenProducto.find(item => item.label === producto.Origen).value, origenValidate)
  const Impuestos = useField('number',  0, impuestoValidate)
  const hasImpuestos = useSwitch(false)
  const Precio1 = useField('number', producto.Precios[0].Precio, precioValidate)
  const Precio2 = useField('number', producto.Precios[1].Precio, precioValidate)
  const Precio3 = useField('number', producto.Precios[2].Precio, precioValidate)
  const Precio4 = useField('number', producto.Precios[3].Precio, precioValidate)

  const createErrorMessage = (message) => {
    switch (true) {
    case message.includes('barra'):
      CodigoBarra.functions.createError(message)
      break
    case message.includes('descripcion'):
      Descripcion.functions.createError(message)
      break
    case message.includes('categoria'):
      Categoria.functions.createError(message)
      break
    case message.includes('origen'):
      Origen.functions.createError(message)
      break
    case Precio1.includes('precio'):
      Precio1.functions.createError(message)
      break
    case Precio2.includes('precio'):
      Precio1.functions.createError(message)
      break
    case Precio3.includes('precio'):
      Precio1.functions.createError(message)
      break
    case Precio4.includes('precio'):
      Precio1.functions.createError(message)
      break
    default:
      break
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const nuevoProducto = {
      'CodigoBarra': CodigoBarra.form.value,
      'Descripcion': Descripcion.form.value,
      'Categoria': categoriaProducto.find(item => item.value === Categoria.form.value).label,
      'Origen': origenProducto.find(item => item.value === Origen.form.value).label,
      'Precios': [
        {
          'Precio': parseInt(Precio1.form.value),
          'Categoria': 'Precio 1',
          'Impuesto': !hasImpuestos.checked ? 0 : (Impuestos.form.value/100) * Precio1.form.value
        },
        {
          'Precio': parseInt(Precio2.form.value),
          'Categoria': 'Precio 2',
          'Impuesto': !hasImpuestos.checked ? 0 : (Impuestos.form.value/100) * Precio2.form.value
        },
        {
          'Precio': parseInt(Precio3.form.value),
          'Categoria': 'Precio 3',
          'Impuesto': !hasImpuestos.checked ? 0 : (Impuestos.form.value/100) * Precio3.form.value
        },
        {
          'Precio': parseInt(Precio4.form.value),
          'Categoria': 'Precio 4',
          'Impuesto': !hasImpuestos.checked ? 0 : (Impuestos.form.value/100) * Precio4.form.value
        }]
    }
    const producto = await productoservices.update(id, nuevoProducto)
    dispatch(initializeProductos())
    if(producto.data.error){
      createErrorMessage(producto.data.message)
    } else {
      dispatch(createNotification('¡Producto creado correctamente!', 'Información'))
      history.push('/Inventario')
    }
  }

  const validate = () => {
    if (hasImpuestos.checked) {
      Impuestos.functions.validate()
    }
    CodigoBarra.functions.validate()
    Descripcion.functions.validate()
    Categoria.functions.validate()
    Origen.functions.validate()
    Precio1.functions.validate()
    Precio2.functions.validate()
    Precio3.functions.validate()
    Precio4.functions.validate()
  }

  const isValidate = () => {
    if (hasImpuestos.checked) {
      return Impuestos.functions.isValidate() && CodigoBarra.functions.isValidate() && Descripcion.functions.isValidate() && Categoria.functions.isValidate() && Origen.functions.isValidate() && Precio1.functions.isValidate() && Precio2.functions.isValidate() && Precio3.functions.isValidate() && Precio4.functions.isValidate()
    }
    return CodigoBarra.functions.isValidate() && Descripcion.functions.isValidate() && Categoria.functions.isValidate() && Origen.functions.isValidate() && Precio1.functions.isValidate() && Precio2.functions.isValidate() && Precio3.functions.isValidate() && Precio4.functions.isValidate()
  }

  return (
    <form onSubmit={onSubmit}>
      <Grid sx={{ width: '100%' }} container spacing={0} direction='column' alignItems='center' justifyContent='center'>
        <Grid item xs={12} sx={itemForm()}>
          <TextInput moreSx={inputForm()} { ...CodigoBarra.form } label={'Codigo Barra'} />
          <TextInput moreSx={inputForm()} { ...Descripcion.form } label={'Descripcion'} />
        </Grid>
        <Grid item xs={12} sx={itemForm()}>
          <SelectInput moreSx={inputForm()}  { ...Origen.form } options={origenProducto} label={'Origen'} text={'Seleccione un origen'} />
          <SelectInput moreSx={inputForm()}  { ...Categoria.form } options={categoriaProducto} label={'Categoria'} text={'Seleccione una categoria'} />
        </Grid>
        <Grid item xs={12} sx={itemForm()}>
          <TextInput moreSx={inputForm()} { ...Precio1.form } label={'Precio (1)'} />
          <TextInput moreSx={inputForm()} { ...Precio2.form } label={'Precio (2)'} />
        </Grid>
        <Grid item xs={12} sx={itemForm()}>
          <TextInput moreSx={inputForm()} { ...Precio3.form } label={'Precio (3)'} />
          <TextInput moreSx={inputForm()} { ...Precio4.form } label={'Precio (4)'} />
        </Grid>

        <Grid item xs={12} sx={itemForm()}>
          <SwitchInput moreSx={inputForm()} label={'¿El producto tiene impuestos?'} { ...hasImpuestos} color={'primary'} />
          <SelectInput disable ={!hasImpuestos.checked} moreSx={inputForm()}  { ...Impuestos.form } options={impuestos} label={'Impuestos'} text={'Seleccione un impuesto'} />
        </Grid>

        <Grid item xs={12} sx={itemForm()}>
          {isValidate() ?
            <Button moreSx={inputForm()} color={'success'} text={'Actualizar producto'} submit={true} />:
            <Button moreSx={inputForm()} color={'success'} text={'Actualizar producto'} onClick={() => validate()} />
          }
          <Button moreSx={inputForm()} onClick={() => history.push('/Inventario')} color={'error'} text={'Salir'} />
        </Grid>
      </Grid>
    </form>
  )
}

export default ProductoUpdate