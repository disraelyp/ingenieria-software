
const reducer = (state = null, action) => {
  switch (action.type) {
  case 'CREATE_NOTIFICATION':
    return action.data
  case 'REMOVE_NOTIFICATION':
    return null
  default:
    return state
  }
}

export const createNotification = (message, severity) => {
  const id =Math.floor(Math.random()*10000000000000)
  return dispatch => {
    const notificacion = {
      message: message,
      severity: severity,
      id: id,
    }
    dispatch({
      type: 'CREATE_NOTIFICATION',
      data: notificacion
    })
  }
}


export const deleteNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
  }
}

export default reducer