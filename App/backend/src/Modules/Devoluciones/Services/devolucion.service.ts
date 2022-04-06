import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { validateToken } from 'src/Utils/validateToken'
import { Repository } from 'typeorm'
import { DevolucionEntity } from '../Entity/devolucion.entity'
import axios from 'axios'
import { verificarProductoPedido } from 'src/Utils/verificarProductoPedido'

const dotenv = require('dotenv')
dotenv.config()


@Injectable()
export class DevolucionService {
  constructor(
    @InjectRepository(DevolucionEntity)
    private readonly devolucionRP: Repository<DevolucionEntity>,
  ) {}


  async findAll(token: any) {
    // VERIFICACION DEL TOKEN
    if(validateToken(token,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    return await this.devolucionRP.find({ relations: ['Productos', 'Cliente'] })
  }

  async saveDevolucion(devolucion: any){

    // VERIFICACION DEL TOKEN
    if(validateToken(devolucion,  ['Administrador', 'Cajera']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    if (!devolucion.Vendedor || typeof devolucion.Vendedor !== 'string') {
      return { message: 'Ingrese el vendedor de la devolucion', error: 401 }
    }
    if(!devolucion.Productos || !Array.isArray(devolucion.Productos)){
      return { message: 'Listado de productos invalido', error: 401 }
    }
    const productos = (devolucion.Productos).map(precio => verificarProductoPedido(precio))
    if(productos.includes(false)){
      return { message: 'Formato de los productos invalido', error: 401 }
    }
    if (!devolucion.Cliente  || typeof devolucion.Cliente !== 'number') {
      return { message: 'Ingrese un cliente', error: 401 }
    }
    const nuevoDevolucion: any = {
      Cliente: devolucion.Cliente,
      FechaCreacion: new Date(),
      Vendedor: devolucion.Vendedor,
      Pagado: false
    }
    const devolucionIngresada = await this.devolucionRP.save(nuevoDevolucion)
    for (let a = 0; a < devolucion.Productos.length; a++) {
      const element = devolucion.Productos[a]
      const request = {
        'token': devolucion.token,
        'Cantidad': parseInt(element.Cantidad)
      }
      await axios.put('http://localhost:3001/Cantidad-Producto/'+element.Producto, request)
    }
    for (let b = 0; b < devolucion.Productos.length; b++) {
      await axios.post('http://localhost:3001/producto-devoluciones', { Devolucion: devolucionIngresada.ID, ...devolucion.Productos[b], token:  devolucion.token })
    }

    return devolucionIngresada
  }

  async cambiarEstado(object: any){

    // Verificacion de token
    if(validateToken(object,  ['Administrador', 'Cajera']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    // verificacion de estado
    if (!object.Pagado || typeof object.Pagado !== 'boolean') {
      return { message: 'Ingrese el estado de la devolucion', error: 401 }
    }
    // Verificacion de ID
    if (!object.ID || typeof object.ID !== 'number') {
      return { message: 'Ingrese el ID de la devolucion', error: 401 }
    }

    const devoluciones = await this.devolucionRP.find()
    const devolucion = devoluciones.find(devolucion => devolucion.ID === parseInt(object.ID))


    if(!devolucion){
      return { Message: 'Ingrese un ID valido', error: 401 }
    }

    const devolucionModificado = {
      Pagado: object.Pagado
    }
    await this.devolucionRP.update(devolucion.ID, devolucionModificado)
    return await this.devolucionRP.findOne(object.ID)
  }
}