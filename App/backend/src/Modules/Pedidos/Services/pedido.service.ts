import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { validateToken } from 'src/Utils/validateToken'
import { Repository } from 'typeorm'
import { PedidoEntity } from '../Entity/pedido.entity'
import { Estados } from '../Constants/Estados'
import axios from 'axios'
import { verificarProductoPedido } from 'src/Utils/verificarProductoPedido'

const dotenv = require('dotenv')
dotenv.config()


@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRP: Repository<PedidoEntity>,
  ) {}


  async findAll(token: any) {
    // VERIFICACION DEL TOKEN
    if(validateToken(token,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }

    // eslint-disable-next-line arrow-spacing
    return await this.pedidoRP.find({ relations: ['Productos', 'Cliente'] })
  }

  async savePedido(pedido: any){

    // VERIFICACION DEL TOKEN
    if(validateToken(pedido,  ['Administrador', 'Cajera']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }

    // VERIFICACION DE LOS DATOS DEL PEDIDO
    if (!pedido.Vendedor || typeof pedido.Vendedor !== 'string') {
      return { message: 'Ingrese el vendedor del pedido', error: 401 }
    }

    // VERIFICACION DE LOS PRODUCTOS
    if(!pedido.Productos || !Array.isArray(pedido.Productos)){
      return { message: 'Listado de productos invalido', error: 401 }
    }
    const productos = (pedido.Productos).map(precio => verificarProductoPedido(precio))
    if(productos.includes(false)){
      return { message: 'Formato de los productos invalido', error: 401 }
    }

    if (!pedido.Cliente  || typeof pedido.Cliente !== 'number') {
      return { message: 'Ingrese un cliente', error: 401 }
    }
    const nuevoPedido: any = {
      Cliente: pedido.Cliente,
      FechaCreacion: new Date(),
      FechaModificacion: new Date(),
      Estado: 'En proceso',
      Vendedor: pedido.Vendedor,
      Pagado: false
    }
    const pedidoIngresado = await this.pedidoRP.save(nuevoPedido)
    for (let index = 0; index < pedido.Productos.length; index++) {
      await axios.post('http://localhost:3001/producto-pedidos', { Pedido: pedidoIngresado.ID, ...pedido.Productos[index], token:  pedido.token })
    }
    return pedidoIngresado
  }

  async updatePedido (id: any, object: any){


    if(validateToken(object,  ['Administrador', 'Cajera']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    if(!object.Productos || !Array.isArray(object.Productos)){
      return { message: 'Listado de productos invalido', error: 401 }
    }
    const productos = (object.Productos).map(precio => verificarProductoPedido(precio))
    if(productos.includes(false)){
      return { message: 'Formato de los productos invalido', error: 401 }
    }

    const pedidos = await this.pedidoRP.find({ relations: ['Productos', 'Cliente'] })
    const pedido = pedidos.find(pedido => pedido.ID === parseInt(id))

    if(!pedido){
      return { Message: 'Ingrese un ID valido', error: 401 }
    }
    if(pedido.Estado !== 'En proceso') {
      return { Message: 'Solo puede modificar un pedido en proceso', error: 401 }
    }

    for (let index = 0; index < pedido.Productos.length; index++) {
      const request ={
        'token': object.token,
      }
      await axios.delete('http://localhost:3001/producto-pedidos/'+pedido.Productos[index].ID, { data: request })
    }

    const pedidoActualizado: any ={
      Cliente: pedido.Cliente,
      FechaCreacion: pedido.FechaCreacion,
      FechaModificacion: new Date(),
      Estado: 'En proceso',
      Vendedor: pedido.Vendedor,
      Pagado: false
    }

    await this.pedidoRP.update(id, pedidoActualizado)
    for (let index = 0; index < object.Productos.length; index++) {
      await axios.post('http://localhost:3001/producto-pedidos', { Pedido: parseInt(id), ...object.Productos[index], token:  object.token })
    }
    return await this.pedidoRP.findOne(object.ID)
  }

  async deletePedido(token: any, id:any){
    if(validateToken(token,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    const pedidos = await this.pedidoRP.find({ relations: ['Productos', 'Cliente'] })
    const pedido = pedidos.find(pedido => pedido.ID === parseInt(id))

    if(pedido || pedido.Estado === 'En proceso'){
      await this.pedidoRP.delete(id)
      for (let index = 0; index < pedido.Productos.length; index++) {
        const request ={
          'token': token,
        }
        await axios.delete('http://localhost:3001/producto-pedidos/'+pedido.Productos[index].ID, { data: request })
      }
    }
    return { Message: 'Ingrese un ID valido', error: 401 }
  }

  async cambiarEstado(object: any){

    // Verificacion de token
    if(validateToken(object,  ['Administrador', 'Cajera']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }

    // verificacion de estado
    if (!object.Estado || typeof object.Estado !== 'string') {
      return { message: 'Ingrese el estado del pedido', error: 401 }
    }

    // Verificacion de ID
    if (!object.ID || typeof object.ID !== 'number') {
      return { message: 'Ingrese el ID del pedido', error: 401 }
    }

    // Verificacion de estado
    if (!object.hasOwnProperty('Pagado') || typeof object.Pagado !== 'boolean') {
      return { message: 'Ingrese el estado de pago', error: 401 }
    }

    const pedidos = await this.pedidoRP.find({ relations: ['Productos', 'Cliente'] })
    const pedido = pedidos.find(pedido => pedido.ID === parseInt(object.ID))

    const productos = (await axios.get('http://localhost:3001/Productos/'+object.token)).data
    const productoPedidos = (productos.filter(producto => (pedido.Productos.map(a => a.CodigoBarra)).includes(producto.CodigoBarra))).map(producto => {return { 'CodigoBarra': producto.CodigoBarra, 'ID': producto.ID }})
    const productoModificar  = productoPedidos.map(producto => { return { ...producto, 'Cantidad': ((pedido.Productos).find(pProducto => pProducto.CodigoBarra === producto.CodigoBarra)).Cantidad }})


    if(!pedido){
      return { Message: 'Ingrese un ID valido', error: 401 }
    }
    if(!Estados.includes(object.Estado)){
      return { message: 'Ingrese el estado del pedido valido', error: 401 }
    }

    if(pedido.Estado === 'En proceso' && pedido.Estado !== object.Estado) {
      for (let index = 0; index < productoModificar.length; index++) {
        const element = productoModificar[index]
        const request = {
          'token': object.token,
          'Cantidad': parseInt(element.Cantidad)*-1
        }
        await axios.put('http://localhost:3001/Cantidad-Producto/'+element.ID, request)
      }
    }

    const pedidoModificado = {
      FechaModificacion: new Date(),
      Estado: object.Estado,
      Pagado: object.Pagado
    }
    await this.pedidoRP.update(pedido.ID, pedidoModificado)
    return await this.pedidoRP.findOne(object.ID)

  }
}