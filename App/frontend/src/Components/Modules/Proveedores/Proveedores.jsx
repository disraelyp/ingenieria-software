import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ProveedorColumns } from '../../../Utils/columns'
import { DataGrid } from '@mui/x-data-grid'
import { Grid } from '@mui/material'
import Button from '../../athomic-components/Button'
import { ProveedoresAdaptarDG } from '../../../Utils/adaptadores'
import { updateTitulo } from '../../../Reducers/tituloReducer'
import ProveedorRemoveModal from './ProveedorRemove'
import { panelMain } from '../../../Styles/panelMain'
import { soloAdministrador } from '../../../Utils/roles'

const Proveedores = () => {

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateTitulo('Proveedores'))
  }, [dispatch])

  const user = useSelector(state => state.user)
  const proveedores = useSelector(state => { return state.proveedores })

  const [openModal, setOpenModal] = useState(false)
  const [selectionModel, setSelectionModel] = useState([])

  return (
    <>
      <div style={panelMain()} >
        <DataGrid
          rows={proveedores.map(item => ProveedoresAdaptarDG(item))}
          columns={ProveedorColumns}
          SelectionMode='Single'
          disableMultipleSelection
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel)
          }}
          selectionModel={selectionModel}
        />
      </div>
      { openModal ? <ProveedorRemoveModal openValue={openModal} id={selectionModel[0] ? selectionModel[0] : null} setOpenModal={setOpenModal}/> : null}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button onClick={() => history.push(soloAdministrador(user.user.Role) ? '/Proveedores/Crear' : '/Proveedores')} disable={!soloAdministrador(user.user.Role)} text={'Crear'} color='success' />
          <Button onClick={() => history.push(soloAdministrador(user.user.Role) ? '/Proveedores/Editar/'+selectionModel[0] : '/Proveedores')} text={'Modificar'} disable={selectionModel.length === 0 ? true : !soloAdministrador(user.user.Role)} color='primary'  />
        </Grid>
        <Grid item xs={6}>
          <Button onClick={soloAdministrador(user.user.Role) ? () => setOpenModal(true) : null} text={'Borrar'} disable={selectionModel.length === 0 ? true : !soloAdministrador(user.user.Role)}  color='warning'  />
          <Button onClick={() => history.push(soloAdministrador(user.user.Role) ? '/Proveedores/Ver/'+selectionModel[0] : '/Proveedores')} disable={selectionModel.length === 0} text={'Ver'} color='secondary' />
        </Grid>
      </Grid>
    </>
  )
}

export default Proveedores