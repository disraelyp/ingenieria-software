import productoServices from '../Services/producto'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_PRODUCTOS':
    return action.data
  default:
    return state
  }
}

export const initializeProductos = () => {
  return async dispatch => {
    const data = await productoServices.getAll()
    dispatch({
      type: 'INIT_PRODUCTOS',
      data
    })
  }
}

export default reducer