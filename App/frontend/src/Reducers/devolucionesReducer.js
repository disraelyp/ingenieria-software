import devolucionesServices from '../Services/devolucion'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_DEVOLUCIONES':
    return action.data
  default:
    return state
  }
}

export const initializeDevoluciones = () => {
  return async dispatch => {
    const data = await devolucionesServices.getAll()
    dispatch({
      type: 'INIT_DEVOLUCIONES',
      data
    })
  }
}

export default reducer