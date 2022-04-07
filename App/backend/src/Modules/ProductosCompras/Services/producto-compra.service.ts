import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import axios from 'axios'
import { validateToken } from 'src/Utils/validateToken'
import { Repository } from 'typeorm'
import { ProductoCompraEntity } from '../Entity/producto-compra.entity'

const dotenv = require('dotenv')
dotenv.config()

@Injectable()
export class ProductoCompraService {
  constructor(
    @InjectRepository(ProductoCompraEntity)
    private readonly productosCompraRP: Repository<ProductoCompraEntity>,
  ) {}
  async createProductoCompra (productoCompra: any){

    if(validateToken(productoCompra,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    if (!productoCompra.Producto || typeof productoCompra.Producto  !== 'number') {
      return { message: 'Ingrese el codigo de producto', error: 401 }
    }
    if (!productoCompra.Cantidad || typeof productoCompra.Cantidad !== 'number') {
      return { message: 'Ingrese la cantidad del producto', error: 401 }
    }
    if (!productoCompra.Compra || typeof productoCompra.Compra !== 'number') {
      return { message: 'Ingrese la compra del producto', error: 401 }
    }
    if (!productoCompra.hasOwnProperty('Costo') || typeof productoCompra.Costo  !== 'number') {
      return { message: 'Ingrese el Costo de producto', error: 401 }
    }

    const productos = (await axios.get('http://localhost:3001/Productos/'+productoCompra.token)).data
    const producto = productos.find(producto => producto.ID === productoCompra.Producto)

    const nuevoProductoCompra = {
      FechaCreacion: new Date(),
      CodigoBarra: producto.CodigoBarra,
      Descripcion: producto.Descripcion,
      Cantidad: productoCompra.Cantidad,
      Costo: producto.Costo,
      Compra: productoCompra.Compra,
      Producto: productoCompra.Producto,
    }

    return await this.productosCompraRP.insert(nuevoProductoCompra)
  }

}