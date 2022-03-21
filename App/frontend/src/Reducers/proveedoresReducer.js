import proveedoresServices from '../Services/proveedor'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_PROVEEDORES':
    return action.data
  default:
    return state
  }
}

export const initializeProveedores = () => {
  return async dispatch => {
    const data = await proveedoresServices.getAll()
    dispatch({
      type: 'INIT_PROVEEDORES',
      data
    })
  }
}

export default reducer