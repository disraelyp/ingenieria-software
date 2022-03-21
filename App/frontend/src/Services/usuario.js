import axios from 'axios'
import loginLocalStorage from '../Utils/loginLocalStorage'
const baseUrl = '/Usuarios'

const create = async data => {
  const request = {
    'token': loginLocalStorage.loadUser().token,
    ...data
  }
  const response = await axios.post(baseUrl, request)
  return response
}

const getAll = () => {
  try {
    const request = axios.get(baseUrl+'/'+loginLocalStorage.loadUser().token)
    return request.then(response => response.data)
  } catch (e) {
    return []
  }
}

const update = async (id, data) => {
  const request ={
    'token': loginLocalStorage.loadUser().token,
    ...data
  }
  const response = await axios.put(baseUrl+'/'+id, request)
  return response
}

const remove = async id => {
  const request ={
    'token': loginLocalStorage.loadUser().token,
  }
  const send = await axios.delete(baseUrl+'/'+id, { data: request })
  return send
}

export default { getAll, create, update, remove }