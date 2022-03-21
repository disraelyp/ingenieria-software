import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { UsuarioColumns } from '../../../Utils/columns'
import { DataGrid } from '@mui/x-data-grid'
import { Grid } from '@mui/material'
import Button from '../../athomic-components/Button'
import { UsuariosAdaptarDG } from '../../../Utils/adaptadores'
import { updateTitulo } from '../../../Reducers/tituloReducer'
import UsuarioRemoveModal from './UsuarioRemove'
import { panelMain } from '../../../Styles/panelMain'
import { soloAdministrador } from '../../../Utils/roles'

const Usuarios = () => {

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateTitulo('Usuarios'))
  }, [dispatch])

  const user = useSelector(state => state.user)
  const usuarios = useSelector(state => { return state.usuarios })

  const [openModal, setOpenModal] = useState(false)
  const [selectionModel, setSelectionModel] = useState([])

  return (
    <>
      <div style={panelMain()} >
        <DataGrid
          rows={usuarios.map(item => UsuariosAdaptarDG(item))}
          columns={UsuarioColumns}
          SelectionMode='Single'
          disableMultipleSelection
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel)
          }}
          selectionModel={selectionModel}
        />
      </div>
      { openModal ? <UsuarioRemoveModal openValue={openModal} id={selectionModel[0] ? selectionModel[0] : null} setOpenModal={setOpenModal}/> : null}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button onClick={() => history.push(soloAdministrador(user.user.Role) ? '/Usuarios/Crear' : '/Usuarios')} disable={!soloAdministrador(user.user.Role)} text={'Crear'} color='success' />
          <Button onClick={() => history.push(soloAdministrador(user.user.Role) ? '/Usuarios/Editar/'+selectionModel[0] : '/Usuarios')} text={'Modificar'} disable={selectionModel.length === 0 ? true : !soloAdministrador(user.user.Role)} color='primary'  />
        </Grid>
        <Grid item xs={6}>
          <Button onClick={soloAdministrador(user.user.Role) ? () => setOpenModal(true) : null} text={'Borrar'} disable={selectionModel.length === 0 ? true : !soloAdministrador(user.user.Role)}  color='warning'  />
          <Button onClick={() => history.push(soloAdministrador(user.user.Role) ? '/Usuarios/Ver/'+selectionModel[0] : '/Usuarios')} disable={selectionModel.length === 0} text={'Ver'} color='secondary' />
        </Grid>
      </Grid>
    </>
  )
}

export default Usuarios