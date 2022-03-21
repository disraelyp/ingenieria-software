import usuariosServices from '../Services/usuario'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USUARIOS':
    return action.data
  default:
    return state
  }
}

export const initializeUsuarios = () => {
  return async dispatch => {
    const data = await usuariosServices.getAll()
    dispatch({
      type: 'INIT_USUARIOS',
      data
    })
  }
}

export default reducer