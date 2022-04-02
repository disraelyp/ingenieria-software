import pedidoServices from '../Services/pedido'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_PEDIDOS':
    return action.data
  default:
    return state
  }
}

export const initializePedidos = () => {
  return async dispatch => {
    const data = await pedidoServices.getAll()
    dispatch({
      type: 'INIT_PEDIDOS',
      data
    })
  }
}

export default reducer