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
      return { message: 'Ingrese la categoria del producto', error: 401 }
    }

    // VERIFICACION DE LOS PRODUCTOS
    if(!pedido.Productos || !Array.isArray(pedido.Productos)){
      return { message: 'Listado de productos invalido', error: 401 }
    }
    const productos = (pedido.Productos).map(precio => verificarProductoPedido(precio))
    if(productos.includes(false)){
      return { message: 'Formato de los productos invalido', error: 401 }
    }

    // VERIFICACION DEL CLIENTE
    //const clientes = (await axios.get('http://localhost:3001/clientes')).data
    if (!pedido.Cliente  || typeof pedido.Cliente !== 'number') {
      return { message: 'Ingrese un cliente', error: 401 }
    }
    const nuevoPedido: any ={
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

  async cambiarEstado(token: any, object: any ){


    if(validateToken(token,  ['Administrador', 'Cajera']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }

    if (!object.ID || typeof object.ID !== 'number') {
      return { message: 'Ingrese el estado del pedido', error: 401 }
    }

    const pedido = await this.pedidoRP.findOne(object.ID)
    if(!pedido){
      return { Message: 'Ingrese un ID valido', error: 401 }
    }


    if (!object.Estado || typeof object.Estado !== 'string') {
      return { message: 'Ingrese el estado del pedido', error: 401 }
    }
    if(!Estados.includes(object.Estado)){
      return { message: 'Ingrese el estado del pedido valido', error: 401 }
    }

    const pedidoModificado = {
      FechaModificacion: new Date(),
      Estado: 'En proceso',
    }

    await this.pedidoRP.update(pedido.ID, pedidoModificado)
    return await this.pedidoRP.findOne(object.ID)

  }
}