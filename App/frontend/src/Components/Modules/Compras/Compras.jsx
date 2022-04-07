import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ComprasColumns } from '../../../Utils/columns'
import { DataGrid } from '@mui/x-data-grid'
import { Grid } from '@mui/material'
import Button from '../../athomic-components/Button'
import { ComprasAdaptarDG } from '../../../Utils/adaptadores'
import { updateTitulo } from '../../../Reducers/tituloReducer'
import { soloAdministrador, soloAdministradorAlmacenista } from '../../../Utils/roles'

const Compras = () => {

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateTitulo('Compras'))
  }, [dispatch])


  const user = useSelector(state => state.user)
  const compras = useSelector(state => { return state.compras })
  const [selectionModel, setSelectionModel] = useState([])

  return (
    <>
      <div style={{ height: 'calc(100vh - 175px)', minHeight: '100px', width: '100%', marginTop: 10 }} >
        <DataGrid
          rows={compras.map(item => ComprasAdaptarDG(item))}
          columns={ComprasColumns}
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
          <Button onClick={() => history.push(soloAdministradorAlmacenista(user.user.Role) ? '/Inventario/Compras/Crear' : '/Inventario/Compras')} disable={!soloAdministradorAlmacenista(user.user.Role)} text={'Crear'} color='primary' />
        </Grid>
        <Grid item xs={6} >
          <Button disable={selectionModel.length === 0 ? true : !soloAdministrador(user.user.Role)} onClick={() => history.push(soloAdministrador(user.user.Role) ? '/Inventario/Compras/Ver/'+selectionModel[0] : '/Inventario/Compras')} text={'Ver'} color='secondary' />
        </Grid>
      </Grid>
    </>
  )
}

export default Compras