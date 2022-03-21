import clienteServices from '../Services/cliente'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_CLIENTES':
    return action.data
  default:
    return state
  }
}

export const initializeClientes= () => {
  return async dispatch => {
    const data = await clienteServices.getAll()
    dispatch({
      type: 'INIT_CLIENTES',
      data
    })
  }
}

export default reducer