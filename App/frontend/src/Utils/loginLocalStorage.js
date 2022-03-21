const storageKey = '902ee9d07fd01e2d87f64386e9219f9964e8a961'

const saveUser = (user) => {
  localStorage.setItem(storageKey, JSON.stringify(user))
}

const loadUser = () => {
  return JSON.parse(localStorage.getItem(storageKey))
}

const logoutUser = () => {
  localStorage.removeItem(storageKey)
}

export default { saveUser, loadUser, logoutUser }