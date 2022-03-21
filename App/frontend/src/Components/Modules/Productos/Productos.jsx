import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ProductoColumns } from '../../../Utils/columns'
import { DataGrid } from '@mui/x-data-grid'
import { Grid } from '@mui/material'
import Button from '../../athomic-components/Button'
import { ProductosAdaptarDG } from '../../../Utils/adaptadores'
import { updateTitulo } from '../../../Reducers/tituloReducer'
import ProductoRemoveModal from './ProductoRemove'
import { panelMain } from '../../../Styles/panelMain'
import { soloAdministrador, soloAdministradorAlmacenista } from '../../../Utils/roles'

const Productos = () => {

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateTitulo('Productos'))
  }, [dispatch])

  const user = useSelector(state => state.user)
  const productos = useSelector(state => { return state.productos })

  const [openModal, setOpenModal] = useState(false)
  const [selectionModel, setSelectionModel] = useState([])

  return (
    <>
      <div style={panelMain()} >
        <DataGrid
          rows={productos.map(item => ProductosAdaptarDG(item))}
          columns={ProductoColumns}
          SelectionMode='Single'
          disableMultipleSelection
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel)
          }}
          selectionModel={selectionModel}
        />
      </div>
      { openModal ? <ProductoRemoveModal openValue={openModal} id={selectionModel[0] ? selectionModel[0] : null} setOpenModal={setOpenModal}/> : null}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button onClick={() => history.push(soloAdministradorAlmacenista(user.user.Role) ? '/Inventario/Productos/Crear' : '/Inventario')} disable={!soloAdministradorAlmacenista(user.user.Role)} text={'Crear'} color='success' />
          <Button onClick={() => history.push(soloAdministradorAlmacenista(user.user.Role) ? '/Inventario/Productos/Editar/'+selectionModel[0] : '/Inventario')} text={'Modificar'} disable={selectionModel.length === 0 ? true : !soloAdministrador(user.user.Role)} color='primary'  />
        </Grid>
        <Grid item xs={6}>
          <Button onClick={soloAdministrador(user.user.Role) ? () => setOpenModal(true) : null} text={'Borrar'} disable={selectionModel.length === 0 ? true : !soloAdministrador(user.user.Role)}  color='warning'  />
          <Button onClick={() => history.push(soloAdministradorAlmacenista(user.user.Role) ? '/Inventario/Productos/Ver/'+selectionModel[0] : '/Inventario')} disable={selectionModel.length === 0} text={'Ver'} color='secondary' />
        </Grid>
      </Grid>
    </>
  )
}

export default Productos