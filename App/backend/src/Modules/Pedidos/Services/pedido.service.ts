import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { validateToken } from 'src/Utils/validateToken'
import { Repository } from 'typeorm'

import { PedidoEntity } from '../Entity/pedido.entity'
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
    const listado = (await axios.get('http://localhost:3001/Productos/' + token.token)).data
    const pedidos = (await this.pedidoRP.find({ relations: ['Productos'] })).map(pedido => { return { ...pedido, Productos: pedido.Productos.map(producto => { return { ...producto, 'Datos': listado.find(a => a.ID === producto.ID) }} ) } })
    return pedidos.map(pedido => {return { ...pedido }})
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
      Vendedor: pedido.Vendedor,
    }
    const pedidoIngresado = await this.pedidoRP.save(nuevoPedido)
    for (let index = 0; index < pedido.Productos.length; index++) {
      await axios.post('http://localhost:3001/producto-pedidos', { Pedido: pedidoIngresado.ID, ...pedido.Productos[index], token:  pedido.token })
    }
    return pedidoIngresado
  }
}