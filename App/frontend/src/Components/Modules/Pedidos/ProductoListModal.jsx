import React, { useState } from 'react'
import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material'
import { ProductoModalColumns } from '../../../Utils/columns'
import { DataGrid } from '@mui/x-data-grid'
import { ProductosAdaptarDG } from '../../../Utils/adaptadores'
import { useSelector } from 'react-redux'
import Button from '../../athomic-components/Button'


const ProductoListModal = ({ setOpenProductoListModal, setProducto }) => {


  const productos = useSelector(state => { return state.productos })
  const [selectionModel, setSelectionModel] = useState([])
  const producto = productos.find(cliente => cliente.ID === selectionModel[0])

  const cancelarBoton = () => {
    setOpenProductoListModal(false)
  }

  const aceptarBoton = () => {
    setProducto(producto.CodigoBarra)
    setOpenProductoListModal(false)
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    minWidth: 600,
    maxWidth: 800,
    bgcolor: 'white',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
  }


  return (
    <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={true} onClose={() => setOpenProductoListModal(false)} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500, }} >
      <Fade in={true}>
        <Box sx={modalStyle}>
          <Typography variant="h4" noWrap component="div">
            Seleccionar producto
          </Typography>
          <div style={{ height: 'calc(80vh - 230px)', minHeight: '100px', width: '100%', marginTop: 10 }} >
            <DataGrid
              rows={productos.map(item => ProductosAdaptarDG(item))}
              columns={ProductoModalColumns}
              SelectionMode='Single'
              disableMultipleSelection
              onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel)
              }}
              selectionModel={selectionModel}
            />
          </div>
          <Button onClick={() => aceptarBoton()} text={'Aceptar'} color='success' />
          <Button onClick={() => cancelarBoton()} text={'Cancelar'} color='error' />
        </Box>
      </Fade>
    </Modal>
  )
}

export default ProductoListModal