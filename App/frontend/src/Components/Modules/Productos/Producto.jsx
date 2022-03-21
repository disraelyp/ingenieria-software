
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import useField from './../../../Hooks/useField'
import { categoriaProducto, origenProducto } from './../../../Utils/options'
import { Grid } from '@mui/material'
import TextInput from './../../athomic-components/TextInput'
import SelectInput from './../../athomic-components/SelectInput'
import Button from './../../athomic-components/Button'
import { nombreValidate, categoriaValidate, origenValidate, precioValidate } from './../../../Utils/validaciones'
import { updateTitulo } from './../../../Reducers/tituloReducer'
import { inputForm, itemForm } from './../../../Styles/gridForm'
import { oneLine } from './../../../Styles/breakPoints'

const Producto = () => {

  const id = useParams().id
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateTitulo('Ver producto'))
  }, [dispatch])

  const productos = useSelector(state => {return state.productos})
  const producto = productos.find(item => item.ID === parseInt(id))
  const CodigoBarra = useField('text', producto.CodigoBarra, nombreValidate)
  const Descripcion = useField('text', producto.Descripcion, nombreValidate)
  const Categoria = useField('number', categoriaProducto.find(item => item.label === producto.Categoria).value, categoriaValidate)
  const Origen = useField('number', origenProducto.find(item => item.label === producto.Origen).value, origenValidate)
  const Precio1 = useField('number', producto.Precios[0].Precio + producto.Precios[0].Impuesto, precioValidate)
  const Precio2 = useField('number', producto.Precios[1].Precio + producto.Precios[1].Impuesto, precioValidate)
  const Precio3 = useField('number', producto.Precios[2].Precio + producto.Precios[2].Impuesto, precioValidate)
  const Precio4 = useField('number', producto.Precios[3].Precio + producto.Precios[3].Impuesto, precioValidate)

  return (
    <Grid sx={{ width: '100%' }} container spacing={0} direction='column' alignItems='center' justifyContent='center'>
      <Grid item xs={12} sx={itemForm()}>
        <TextInput disable={true} moreSx={inputForm()} { ...CodigoBarra.form } label={'Codigo Barra'} />
        <TextInput disable={true} moreSx={inputForm()} { ...Descripcion.form } label={'Descripcion'} />
      </Grid>
      <Grid item xs={12} sx={itemForm()}>
        <SelectInput disable={true} moreSx={inputForm()}  { ...Origen.form } options={origenProducto} label={'Origen'} text={'Seleccione un origen'} />
        <SelectInput disable={true} moreSx={inputForm()}  { ...Categoria.form } options={categoriaProducto} label={'Categoria'} text={'Seleccione una categoria'} />
      </Grid>
      <Grid item xs={12} sx={itemForm()}>
        <TextInput disable={true} moreSx={inputForm()} { ...Precio1.form } label={'Precio (1)'} />
        <TextInput disable={true} moreSx={inputForm()} { ...Precio2.form } label={'Precio (2)'} />
      </Grid>
      <Grid item xs={12} sx={itemForm()}>
        <TextInput disable={true} moreSx={inputForm()} { ...Precio3.form } label={'Precio (3)'} />
        <TextInput disable={true} moreSx={inputForm()} { ...Precio4.form } label={'Precio (4)'} />
      </Grid>
      <Grid item xs={12} sx={itemForm()}>
        <Button moreSx={oneLine} onClick={() => history.push('/Inventario')} color={'error'} text={'Salir'} />
      </Grid>
    </Grid>
  )
}

export default Producto