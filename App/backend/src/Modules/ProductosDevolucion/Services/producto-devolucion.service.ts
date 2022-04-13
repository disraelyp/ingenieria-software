import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import axios from 'axios'
import { validateToken } from 'src/Utils/validateToken'
import { Repository } from 'typeorm'
import { ProductoDevolucionEntity } from '../Entity/producto-devolucion.entity'

const dotenv = require('dotenv')
dotenv.config()

@Injectable()
export class ProductoDevolucionService {
  constructor(
    @InjectRepository(ProductoDevolucionEntity)
    private readonly productosDevueltosRP: Repository<ProductoDevolucionEntity>,
  ) {}
  async createProductoDevolucion (productoDevolucion: any){
    if(validateToken(productoDevolucion,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    if (!productoDevolucion.Producto || typeof productoDevolucion.Producto  !== 'number') {
      return { message: 'Ingrese el codigo de producto', error: 401 }
    }
    if (!productoDevolucion.Cantidad || typeof productoDevolucion.Cantidad !== 'number') {
      return { message: 'Ingrese la cantidad del producto', error: 401 }
    }
    if (!productoDevolucion.Devolucion || typeof productoDevolucion.Devolucion !== 'number') {
      return { message: 'Ingrese la devolucion del producto', error: 401 }
    }
    if (!productoDevolucion.hasOwnProperty('Precio') || typeof productoDevolucion.Precio  !== 'number') {
      return { message: 'Ingrese el precio de producto', error: 401 }
    }
    if(!productoDevolucion.hasOwnProperty('Impuesto') || typeof productoDevolucion.Impuesto !== 'number') {
      return { message: 'Ingrese el impuesto del producto', error: 401 }
    }

    const productos = (await axios.get('http://localhost:3001/Productos/'+productoDevolucion.token)).data
    const producto = productos.find(producto => producto.ID === productoDevolucion.Producto)

    const nuevoProductoDevolucion = {
      FechaCreacion: new Date(),
      CodigoBarra: producto.CodigoBarra,
      Descripcion: producto.Descripcion,
      Cantidad: productoDevolucion.Cantidad,
      Costo: productoDevolucion.Costo ? productoDevolucion.Costo : 0,
      Precio: productoDevolucion.Precio,
      Impuesto: productoDevolucion.Impuesto,
      Devolucion: productoDevolucion.Devolucion,
      Producto: productoDevolucion.Producto,
    }

    return await this.productosDevueltosRP.insert(nuevoProductoDevolucion)
  }

}