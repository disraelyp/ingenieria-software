import notaDebito from '../Services/notaDebito'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_NOTAS_DEBITO':
    return action.data
  default:
    return state
  }
}

export const initializeNotaDebito = () => {
  return async dispatch => {
    const data = await notaDebito.getAll()
    dispatch({
      type: 'INIT_NOTAS_DEBITO',
      data
    })
  }
}

export default reducer