
const reducer = (state = 'Viajes', action) => {
  switch (action.type) {
  case 'UPDATE_TITULO':
    return action.data
  default:
    return state
  }
}

export const updateTitulo = (titulo) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_TITULO',
      data: titulo
    })
  }
}

export default reducer