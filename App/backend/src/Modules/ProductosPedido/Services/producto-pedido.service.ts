import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import axios from 'axios'
import { validateToken } from 'src/Utils/validateToken'
import { Repository } from 'typeorm'
import { ProductoPedidoEntity } from '../Entity/producto-pedido.entity'
import { Categorias } from 'src/Modules/Precios/Constants/Categoria'

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
    if (!productoPedido.Producto) {
      return { message: 'Ingrese el codigo de producto', error: 401 }
    }
    if (!productoPedido.Cantidad) {
      return { message: 'Ingrese la cantidad del producto', error: 401 }
    }
    if (!productoPedido.Categoria) {
      return { message: 'Ingrese la categoria del producto', error: 401 }
    }
    if (!productoPedido.Pedido) {
      return { message: 'Ingrese el pedido del producto', error: 401 }
    }
    if(!Categorias.includes(productoPedido.Categoria)) {
      return { message: 'Ingrese una categoria de precio valida', error: 401 }
    }

    const productos = (await axios.get('http://localhost:3001/Productos/'+productoPedido.token)).data
    const producto = productos.find(producto => producto.ID === productoPedido.Producto)

    const nuevoProductoPedido = {
      CodigoBarra: producto.CodigoBarra,
      Descripcion: producto.Descripcion,
      Cantidad: productoPedido.Cantidad,
      Pedido: productoPedido.Pedido,
      Categoria: productoPedido.Categoria,
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