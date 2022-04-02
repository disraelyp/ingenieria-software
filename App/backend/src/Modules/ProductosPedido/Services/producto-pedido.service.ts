import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import axios from 'axios'
import { validateToken } from 'src/Utils/validateToken'
import { Repository } from 'typeorm'
import { ProductoPedidoEntity } from '../Entity/producto-pedido.entity'

const dotenv = require('dotenv')
dotenv.config()

@Injectable()
export class ProductoPedidoService {
  constructor(
    @InjectRepository(ProductoPedidoEntity)
    private readonly productosVendidosRP: Repository<ProductoPedidoEntity>,
  ) {}

  async createProductoPedido (productoPedido: any){
    if(validateToken(productoPedido,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    if (!productoPedido.Producto || typeof productoPedido.Producto  !== 'number') {
      return { message: 'Ingrese el codigo de producto', error: 401 }
    }
    if (!productoPedido.Cantidad || typeof productoPedido.Cantidad !== 'number') {
      return { message: 'Ingrese la cantidad del producto', error: 401 }
    }
    if (!productoPedido.Pedido || typeof productoPedido.Pedido !== 'number') {
      return { message: 'Ingrese el pedido del producto', error: 401 }
    }

    if (!productoPedido.hasOwnProperty('Precio') || typeof productoPedido.Precio  !== 'number') {
      return { message: 'Ingrese el precio de producto', error: 401 }
    }
    if(!productoPedido.hasOwnProperty('Impuesto') || typeof productoPedido.Impuesto !== 'number') {
      return { message: 'Ingrese el impuesto del producto', error: 401 }
    }


    const productos = (await axios.get('http://localhost:3001/Productos/'+productoPedido.token)).data
    const producto = productos.find(producto => producto.ID === productoPedido.Producto)

    const nuevoProductoPedido = {
      FechaCreacion: new Date(),
      CodigoBarra: producto.CodigoBarra,
      Descripcion: producto.Descripcion,
      Cantidad: productoPedido.Cantidad,
      Costo: productoPedido.Costo,
      Precio: productoPedido.Precio,
      Impuesto: productoPedido.Impuesto,
      Pedido: productoPedido.Pedido,
      Producto: productoPedido.Producto,
    }
    return await this.productosVendidosRP.insert(nuevoProductoPedido)
  }

  async deletProductoPedido(token: any, id:number){
    if(validateToken(token,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    const productosVendidos = await this.productosVendidosRP.findOne(id)
    if(productosVendidos){
      await this.productosVendidosRP.delete(id)
    }
    return { Message: 'Ingrese un ID valido', error: 401 }
  }
}