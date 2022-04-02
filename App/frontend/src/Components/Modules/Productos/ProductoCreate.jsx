
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
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
import { oneLine } from '../../../Styles/breakPoints'

const ProductoCreate = () => {

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateTitulo('Crear productos'))
  }, [dispatch])

  const CodigoBarra = useField('text', '', nombreValidate)
  const Descripcion = useField('text', '', nombreValidate)
  const Categoria = useField('number', 0, categoriaValidate)
  const Origen = useField('number', 0, origenValidate)
  const Impuestos = useField('number', 0, impuestoValidate)
  const hasImpuestos = useSwitch(false)
  const Precio1 = useField('number', 0, precioValidate)
  const Precio2 = useField('number', 0, precioValidate)
  const Precio3 = useField('number', 0, precioValidate)
  const Precio4 = useField('number', 0, precioValidate)
  const Costo = useField('number', 0, precioValidate)

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
    case message.includes('costo'):
      Costo.functions.createError(message)
      break
    case message.includes('precio'):
      Precio1.functions.createError(message)
      Precio2.functions.createError(message)
      Precio3.functions.createError(message)
      Precio4.functions.createError(message)
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
      'Costo': parseInt(Costo.form.value),
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
    const producto = await productoservices.create(nuevoProducto)
    if(producto.data.error){
      createErrorMessage(producto.data.message)
    } else {
      dispatch(initializeProductos())
      dispatch(createNotification('¡Producto creado correctamente!', 'Información'))
      history.push('/Inventario/Productos')
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
    Costo.functions.validate()
    Precio1.functions.validate()
    Precio2.functions.validate()
    Precio3.functions.validate()
    Precio4.functions.validate()
  }

  const porcentaje = (precio, costo) => {

    if(costo === precio) {
      return '% 0'
    } else if (precio === 0 && costo !== 0){
      return '-%100'
    } else if (costo === 0 && precio !== 0){
      return '%100'
    } else if (precio>costo && costo!==0) {
      return '-%'+ (precio/costo)*100
    } else if (costo>precio && precio!==0) {
      return '%'+ (costo/precio)*100
    }

  }

  const isValidate = () => {
    if (hasImpuestos.checked) {
      return Costo.functions.isValidate() && Impuestos.functions.isValidate() && CodigoBarra.functions.isValidate() && Descripcion.functions.isValidate() && Categoria.functions.isValidate() && Origen.functions.isValidate() && Precio1.functions.isValidate() && Precio2.functions.isValidate() && Precio3.functions.isValidate() && Precio4.functions.isValidate()
    }
    return Costo.functions.isValidate() && CodigoBarra.functions.isValidate() && Descripcion.functions.isValidate() && Categoria.functions.isValidate() && Origen.functions.isValidate() && Precio1.functions.isValidate() && Precio2.functions.isValidate() && Precio3.functions.isValidate() && Precio4.functions.isValidate()
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
          <TextInput moreSx={oneLine} { ...Costo.form } label={'Costo)'} />
        </Grid>

        <Grid item xs={12} sx={itemForm()}>
          <TextInput moreSx={inputForm()} { ...Precio1.form } label={'Precio (1)'} />
          <TextInput moreSx={inputForm()} disable={true} value={porcentaje(Precio1.form.value, Costo.form.value)} label={''} />
        </Grid>
        <Grid item xs={12} sx={itemForm()}>
          <TextInput moreSx={inputForm()} { ...Precio2.form } label={'Precio (2)'} />
          <TextInput moreSx={inputForm()} disable={true} value={porcentaje(Precio2.form.value, Costo.form.value)} label={''} />
        </Grid>
        <Grid item xs={12} sx={itemForm()}>
          <TextInput moreSx={inputForm()} { ...Precio3.form } label={'Precio (3)'} />
          <TextInput moreSx={inputForm()} disable={true} value={porcentaje(Precio3.form.value, Costo.form.value)} label={''} />
        </Grid>
        <Grid item xs={12} sx={itemForm()}>
          <TextInput moreSx={inputForm()} { ...Precio4.form } label={'Precio (4)'} />
          <TextInput moreSx={inputForm()} disable={true} value={porcentaje(Precio4.form.value, Costo.form.value)} label={''} />
        </Grid>

        <Grid item xs={12} sx={itemForm()}>
          <SwitchInput moreSx={inputForm()} label={'¿El producto tiene impuestos?'} { ...hasImpuestos} color={'primary'} />
          <SelectInput disable ={!hasImpuestos.checked} moreSx={inputForm()}  { ...Impuestos.form } options={impuestos} label={'Impuestos'} text={'Seleccione un impuesto'} />
        </Grid>

        <Grid item xs={12} sx={itemForm()}>
          {isValidate() ?
            <Button moreSx={inputForm()} color={'success'} text={'Crear producto'} submit={true} />:
            <Button moreSx={inputForm()} color={'success'} text={'Crear producto'} onClick={() => validate()} />
          }
          <Button moreSx={inputForm()} onClick={() => history.push('/Inventario/Productos')} color={'error'} text={'Salir'} />
        </Grid>
      </Grid>
    </form>
  )
}

export default ProductoCreate