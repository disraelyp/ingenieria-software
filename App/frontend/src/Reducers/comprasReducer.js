import comprasServices from '../Services/compra'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_COMPRAS':
    return action.data
  default:
    return state
  }
}

export const initializeCompras = () => {
  return async dispatch => {
    const data = await comprasServices.getAll()
    dispatch({
      type: 'INIT_COMPRAS',
      data
    })
  }
}

export default reducer