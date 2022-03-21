import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ClienteColumns } from '../../../Utils/columns'
import { DataGrid } from '@mui/x-data-grid'
import { Grid } from '@mui/material'
import Button from '../../athomic-components/Button'
import { ClientesAdaptarDG } from '../../../Utils/adaptadores'
import { updateTitulo } from '../../../Reducers/tituloReducer'
import ClienteRemoveModal from './ClienteRemove'
import { panelMain } from '../../../Styles/panelMain'
import { soloAdministrador } from '../../../Utils/roles'

const Clientes = () => {

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateTitulo('Clientes'))
  }, [dispatch])

  const user = useSelector(state => state.user)
  const clientes = useSelector(state => { return state.clientes })

  const [openModal, setOpenModal] = useState(false)
  const [selectionModel, setSelectionModel] = useState([])

  return (
    <>
      <div style={panelMain()} >
        <DataGrid
          rows={clientes.map(item => ClientesAdaptarDG(item))}
          columns={ClienteColumns}
          SelectionMode='Single'
          disableMultipleSelection
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel)
          }}
          selectionModel={selectionModel}
        />
      </div>
      { openModal ? <ClienteRemoveModal openValue={openModal} id={selectionModel[0] ? selectionModel[0] : null} setOpenModal={setOpenModal}/> : null}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button onClick={() => history.push(soloAdministrador(user.user.Role) ? '/Clientes/Crear' : '/Clientes')} disable={!soloAdministrador(user.user.Role)} text={'Crear'} color='success' />
          <Button onClick={() => history.push(soloAdministrador(user.user.Role) ? '/Clientes/Editar/'+selectionModel[0] : '/Clientes')} text={'Modificar'} disable={selectionModel.length === 0 ? true : !soloAdministrador(user.user.Role)} color='primary'  />
        </Grid>
        <Grid item xs={6}>
          <Button onClick={soloAdministrador(user.user.Role) ? () => setOpenModal(true) : null} text={'Borrar'} disable={selectionModel.length === 0 ? true : !soloAdministrador(user.user.Role)}  color='warning'  />
          <Button onClick={() => history.push(soloAdministrador(user.user.Role) ? '/Clientes/Ver/'+selectionModel[0] : '/Clientes')} disable={selectionModel.length === 0} text={'Ver'} color='secondary' />
        </Grid>
      </Grid>
    </>
  )
}

export default Clientes