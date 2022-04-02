import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { PedidosColumns } from '../../../Utils/columns'
import { DataGrid } from '@mui/x-data-grid'
import { Grid } from '@mui/material'
import Button from '../../athomic-components/Button'
import { PedidosAdaptarDG } from '../../../Utils/adaptadores'
import { updateTitulo } from '../../../Reducers/tituloReducer'
import { panelMain } from '../../../Styles/panelMain'
import { soloAdministrador, soloAdministradorAlmacenista } from '../../../Utils/roles'

const Plantillas = () => {

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateTitulo(''))
  }, [dispatch])

  const user = useSelector(state => state.user)
  const pedidos = []

  // eslint-disable-next-line no-unused-vars
  const [openModal, setOpenModal] = useState(false)
  const [selectionModel, setSelectionModel] = useState([])

  // { openModal ? <ProductoRemoveModal openValue={openModal} id={selectionModel[0] ? selectionModel[0] : null} setOpenModal={setOpenModal}/> : null}

  return (
    <>
      <div style={panelMain()} >
        <DataGrid
          rows={pedidos.map(item => PedidosAdaptarDG(item))}
          columns={PedidosColumns}
          SelectionMode='Single'
          disableMultipleSelection
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel)
          }}
          selectionModel={selectionModel}
        />
      </div>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button onClick={() => history.push(soloAdministradorAlmacenista(user.user.Role) ? '/Plantilla/Pedidos/Crear' : '/Facturacion')} disable={!soloAdministradorAlmacenista(user.user.Role)} text={'Crear'} color='success' />
          <Button onClick={() => history.push(soloAdministradorAlmacenista(user.user.Role) ? '/Plantilla/Pedidos/Editar/'+selectionModel[0] : '/Facturacion')} text={'Modificar'} disable={selectionModel.length === 0 ? true : !soloAdministrador(user.user.Role)} color='primary'  />
        </Grid>
        <Grid item xs={6}>
          <Button onClick={soloAdministrador(user.user.Role) ? () => setOpenModal(true) : null} text={'Borrar'} disable={selectionModel.length === 0 ? true : !soloAdministrador(user.user.Role)}  color='warning'  />
          <Button onClick={() => history.push(soloAdministradorAlmacenista(user.user.Role) ? '/Plantilla/Pedidos/Ver/'+selectionModel[0] : '/Facturacion')} disable={selectionModel.length === 0} text={'Ver'} color='secondary' />
        </Grid>
      </Grid>
    </>
  )
}

export default Plantillas