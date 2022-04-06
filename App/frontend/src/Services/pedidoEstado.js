import axios from 'axios'
import loginLocalStorage from '../Utils/loginLocalStorage'
const baseUrl = '/PedidoEstado'

const change = async data => {
  const request = {
    'token': loginLocalStorage.loadUser().token,
    ...data
  }
  const response = await axios.post(baseUrl, request)
  return response
}


export default { change }