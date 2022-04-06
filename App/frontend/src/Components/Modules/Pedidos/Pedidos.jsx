import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { PedidosColumns } from '../../../Utils/columns'
import { DataGrid } from '@mui/x-data-grid'
import { Grid } from '@mui/material'
import Button from '../../athomic-components/Button'
import { PedidosAdaptarDG } from '../../../Utils/adaptadores'
import { updateTitulo } from '../../../Reducers/tituloReducer'
import { soloAdministrador, soloAdministradorAlmacenista } from '../../../Utils/roles'
import { darken, lighten } from '@mui/material/styles'
import FacturacionModal from './FacturacionModal'
import PedidoeRemoveModal from './PedidoRemove'
import PedidoeFinalizarModal from './PedidoFinalizar'


const getBackgroundColor = (color, mode) => mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6)
const getHoverBackgroundColor = (color, mode) => mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5)

const Pedidos = () => {

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateTitulo('Pedidos'))
  }, [dispatch])



  const sx = {
    '& .super-app-theme--Finalizado': {
      bgcolor: (theme) =>
        getBackgroundColor('#a5d6a7', theme.palette.mode),
      '&:hover': {
        bgcolor: (theme) =>
          getHoverBackgroundColor('#81c784', theme.palette.mode),
      },
    },
    '& .super-app-theme--En-camino': {
      bgcolor: (theme) =>
        getBackgroundColor('#fff59d', theme.palette.mode),
      '&:hover': {
        bgcolor: (theme) =>
          getBackgroundColor('#fff176', theme.palette.mode),
      },
    },
    '& .super-app-theme--Facturado': {
      bgcolor: (theme) =>
        getBackgroundColor('#ce93d8', theme.palette.mode),
      '&:hover': {
        bgcolor: (theme) =>
          getBackgroundColor('#ba68c8', theme.palette.mode),
      },
    },
    '& .super-app-theme--En-proceso': {
      bgcolor: (theme) =>
        getBackgroundColor('#90caf9', theme.palette.mode),
      '&:hover': {
        bgcolor: (theme) =>
          getHoverBackgroundColor('#64b5f6', theme.palette.mode),
      },
    },

  }

  const user = useSelector(state => state.user)
  const pedidos = useSelector(state => { return state.pedidos })
  const [openModal, setOpenModal] = useState(false)
  const [openFinalizarModal, setOpenFinalizarModal] = useState(false)
  const [selectionModel, setSelectionModel] = useState([])
  const [openFacturacionModal, setOpenFacturacionModal] = useState(false)

  const pedidoSeleccionado = selectionModel.length !== 0 ? (pedidos.find(pedido => pedido.ID === selectionModel[0]) ?  PedidosAdaptarDG(pedidos.find(pedido => pedido.ID === selectionModel[0])) : null) : null

  const modificarDisable = () => {
    if(pedidoSeleccionado){
      if(pedidoSeleccionado.Etapa === 'En proceso') {
        return false
      }
    }
    return true
  }
  const deleteDisable = () => {
    if(pedidoSeleccionado){
      if(pedidoSeleccionado.Etapa === 'En proceso') {
        return false
      }
    }
    return true
  }

  const finalizarDisable = () => {
    if(pedidoSeleccionado){
      if(pedidoSeleccionado.Etapa === 'En camino') {
        return false
      }
    }
    return true
  }

  return (
    <>
      { pedidoSeleccionado ? openFacturacionModal ? <FacturacionModal pedidoSeleccionado={pedidoSeleccionado} setOpenFacturacionModal={setOpenFacturacionModal}/> : null : null }
      { openModal ? <PedidoeRemoveModal openValue={openModal} id={selectionModel[0] ? selectionModel[0] : null} setOpenModal={setOpenModal}/> : null}
      { openFinalizarModal ? <PedidoeFinalizarModal openFinalizarModal={openFinalizarModal} id={selectionModel[0] ? selectionModel[0] : null} setOpenFinalizarModal={setOpenFinalizarModal}/> : null}
      <div style={{ height: 'calc(100vh - 290px)', minHeight: '100px', width: '100%', marginTop: 10 }} >
        <DataGrid
          rows={pedidos.map(item => PedidosAdaptarDG(item))}
          columns={PedidosColumns}
          SelectionMode='Single'
          disableMultipleSelection
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel)
          }}
          sx={sx}
          selectionModel={selectionModel}
          getRowClassName={(params) => `super-app-theme--${params.row.Etapa.replace(' ', '-')}`}
        />
      </div>
      <Grid spacing={2} container >
        <Grid item xs={6} >
          <Button onClick={() => history.push(soloAdministradorAlmacenista(user.user.Role) ? '/Facturacion/Pedidos/Crear' : '/Facturacion')} disable={!soloAdministradorAlmacenista(user.user.Role)} text={'Crear'} color='primary' />
          <Button disable={modificarDisable()} onClick={() => history.push(soloAdministrador(user.user.Role) ? '/Facturacion/Pedidos/Editar/'+selectionModel[0] : '/Facturacion/Pedidos')} text={'Modificar'} color='primary' />
          <Button disable={selectionModel.length === 0 ? true : !soloAdministrador(user.user.Role)} onClick={() => history.push(soloAdministrador(user.user.Role) ? '/Facturacion/Pedidos/Ver/'+selectionModel[0] : '/Facturacion/Pedidos')} text={'Ver'} color='secondary' />
        </Grid>
        <Grid item xs={6}>
          <Button disable={pedidoSeleccionado ? pedidoSeleccionado.Etapa !== 'En proceso' && soloAdministrador(user.user.Role) && selectionModel.length !== 0 : true} onClick={() => setOpenFacturacionModal(true)} text={'Facturar'} color='warning' />
          <Button disable={deleteDisable()} onClick={() => setOpenModal(true)} text={'Eliminar'} color='error' />
          <Button disable={finalizarDisable()} onClick={() => setOpenFinalizarModal(true)} text={'Finalizar'} color='success' />
        </Grid>
      </Grid>
    </>
  )
}

export default Pedidos