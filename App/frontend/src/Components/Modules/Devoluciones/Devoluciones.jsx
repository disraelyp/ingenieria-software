import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { DevolucionesColumns } from '../../../Utils/columns'
import { DataGrid } from '@mui/x-data-grid'
import { Grid } from '@mui/material'
import Button from '../../athomic-components/Button'
import { DevolucionesAdaptarDG } from '../../../Utils/adaptadores'
import { updateTitulo } from '../../../Reducers/tituloReducer'
import { soloAdministrador, soloAdministradorAlmacenista } from '../../../Utils/roles'

const Devoluciones = () => {

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateTitulo('Devoluciones'))
  }, [dispatch])


  const user = useSelector(state => state.user)
  const devoluciones = useSelector(state => { return state.devoluciones })
  const [selectionModel, setSelectionModel] = useState([])

  return (
    <>
      <div style={{ height: 'calc(100vh - 175px)', minHeight: '100px', width: '100%', marginTop: 10 }} >
        <DataGrid
          rows={devoluciones.map(item => DevolucionesAdaptarDG(item))}
          columns={DevolucionesColumns}
          SelectionMode='Single'
          disableMultipleSelection
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel)
          }}
          selectionModel={selectionModel}
        />
      </div>
      <Grid spacing={2} container >
        <Grid item xs={6} >
          <Button onClick={() => history.push(soloAdministradorAlmacenista(user.user.Role) ? '/Facturacion/Devoluciones/Crear' : '/Facturacion/Devoluciones')} disable={!soloAdministradorAlmacenista(user.user.Role)} text={'Crear'} color='primary' />
        </Grid>
        <Grid item xs={6} >
          <Button disable={selectionModel.length === 0 ? true : !soloAdministrador(user.user.Role)} onClick={() => history.push(soloAdministrador(user.user.Role) ? '/Facturacion/Devoluciones/Ver/'+selectionModel[0] : '/Facturacion/Devoluciones')} text={'Ver'} color='secondary' />
        </Grid>
      </Grid>
    </>
  )
}

export default Devoluciones