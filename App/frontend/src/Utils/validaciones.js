export const nombreValidate = (value) => {
  if(value === '' || value.includes(' ')) {
    return 'Ingrese un valor válido'
  }
  return null
}

export const codigoValidate = (value) => {
  if(value === '' || value.includes(' ')) {
    return 'Ingrese un valor válido'
  }
  return null
}


export const cedulaValidate = (value) => {
  if(value === '' || value.includes(' ') || value.includes('_')) {
    return 'Ingrese una cedula del conductor válida'
  }
  return null
}

export const telefonoValidate = (value) => {
  if(value === '' || value.includes('_')) {
    return 'Ingrese un telefono del conductor válido'
  }
  return null
}

export const educacionValidate = (value) => {
  if(value === 0) {
    return 'Ingrese un nivel de educacion valido'
  }
  return null
}

export const sexoValidate = (value) => {
  if(value === 0) {
    return 'Ingrese un sexo valido'
  }
  return null
}

export const licenciaValidate = (value) => {
  if(value === 0) {
    return 'Ingrese una licencia valido'
  }
  return null
}

export const multasValidate = (value) => {
  if(value < 0) {
    return 'Ingrese un cantidad de multas valido'
  }
  return null
}

export const experienciaValidate = (value) => {
  if(value < 0) {
    return 'Ingrese un cantidad de Experiencia valido'
  }
  return null
}

export const usuarioValidate = (value) => {
  if(value === '' || value.includes(' ')) {
    return 'Ingrese un nombre de usuario válido'
  }
  return null
}

export const passwordValidate = (value) => {
  if(value === '' || value.includes(' ')) {
    return 'Ingrese una contraseña válida'
  }
  return null
}

export const matriculaValidate = (value) => {
  if (value==='' || value.includes(' ')) {
    return 'Ingrese una matrícula válida'
  }
  if (value.length !== 7) {
    return 'Ingrese una matrícula con siete(7) caracteres'
  }
  return null
}

export const marcaValidate = (value) => {
  if (value==='') {
    return 'Ingrese una marca válida'
  }
  return null
}

export const combustibleValidate = (value) => {
  if (value === 0) {
    return 'Ingrese un combustible válido'
  }
  return null
}

export const servicioValidate = (value) => {
  if (value === 0) {
    return 'Ingrese un servicio válido'
  }
  return null
}

export const pesoValidate = (value) => {
  if (value <= 0) {
    return 'Ingrese un peso válido'
  }
  return null
}

export const asientosValidate = (value) => {
  if (value <= 0) {
    return 'Ingrese una cantidad válida'
  }
  return null
}

export const añosValidate = (value) => {
  if (value < 0) {
    return 'Ingrese una cantidad válida'
  }
  return null
}

export const velocidadValidate = (value) => {
  if (value <= 0) {
    return 'Ingrese una cantidad válida'
  }
  return null
}

export const distanciaValidate = (value) => {
  if (value <= 0) {
    return 'Ingrese una cantidad válida'
  }
  return null
}

export const vehiculoValidate = (value) => {
  if (value === 0) {
    return 'Seleccione un vehiculo valido'
  }
  return null
}

export const estadoValidate = (value) => {
  if (value === 0) {
    return 'Seleccione un estado'
  }
  return null
}

export const conductorValidate = (value) => {
  if (value === 0) {
    return 'Seleccione un conductor valido'
  }
  return null
}

export const inicioValidate = (value) => {
  if (value === '') {
    return 'Seleccione una fecha valida'
  }
  return null
}

export const finalValidate = (value) => {
  if (value === '') {
    return 'Seleccione una fecha valida'
  }
  return null
}

// eslint-disable-next-line no-unused-vars
export const comentarioValidate = (value) => {
  return null
}

// eslint-disable-next-line no-unused-vars
export const direccionValidate = (value) => {
  return null
}

export const roleValidate = (value) => {
  if (value === 0) {
    return 'Ingrese un role valido'
  }
  return null
}

export const precioOptionesValidate = (value) => {
  if (value < 0) {
    return 'Ingrese un precio valido'
  }
  return null
}

export const origenValidate = (value) => {
  if (value === 0) {
    return 'Ingrese un origen valido'
  }
  return null
}

export const impuestoValidate = (value) => {
  if (value === 0) {
    return 'Ingrese un impuesto valido'
  }
  return null
}

export const categoriaValidate = (value) => {
  if (value === 0) {
    return 'Ingrese un categoria valido'
  }
  return null
}

export const precioValidate = (value) => {
  if (value <= 0) {
    return 'Ingrese un precio valido'
  }
  return null
}

export const cantidadValidate = (value) => {
  if (value <= 0) {
    return 'Ingrese una cantidad valida'
  }
  return null
}

export const metodoPagoValidate = (value) => {
  if (value <= 0) {
    return 'Ingrese un metodo de pago valido'
  }
  return null
}