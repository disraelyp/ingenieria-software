import historialPagosServices from '../Services/historialPagos'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_HISTORIAL_PAGOS':
    return action.data
  default:
    return state
  }
}

export const initializeHistorialPagos = () => {
  return async dispatch => {
    const data = await historialPagosServices.getAll()
    dispatch({
      type: 'INIT_HISTORIAL_PAGOS',
      data
    })
  }
}

export default reducer