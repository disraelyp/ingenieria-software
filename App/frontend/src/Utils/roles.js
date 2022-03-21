export const todosUsuarios = (role) => {
  return [role].includes(role)
}

export const soloAdministrador = (role) => {
  return ['Administrador'].includes(role)
}

export const soloAdministradorAlmacenista = (role) => {
  return ['Administrador', 'Almacenista'].includes(role)
}