import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import axios from 'axios'
import { validateToken } from 'src/Utils/validateToken'
import { Repository } from 'typeorm'
import { ProductoNotaDebitoEntity } from '../Entity/producto-nota-debito.entity'

const dotenv = require('dotenv')
dotenv.config()

@Injectable()
export class ProductoNotaDebitoService {
  constructor(
    @InjectRepository(ProductoNotaDebitoEntity)
    private readonly productoNotaDebitoRP: Repository<ProductoNotaDebitoEntity>,
  ) {}
  async createProductoNotaDebito(productoNotaDebito: any){
    if(validateToken(productoNotaDebito,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    if (!productoNotaDebito.Producto || typeof productoNotaDebito.Producto  !== 'number') {
      return { message: 'Ingrese el codigo de producto', error: 401 }
    }
    if (!productoNotaDebito.Cantidad || typeof productoNotaDebito.Cantidad !== 'number') {
      return { message: 'Ingrese la cantidad del producto', error: 401 }
    }
    if (!productoNotaDebito.NotaDebito || typeof productoNotaDebito.NotaDebito !== 'number') {
      return { message: 'Ingrese la Nota Debito del producto', error: 401 }
    }

    const productos = (await axios.get('http://localhost:3001/Productos/'+productoNotaDebito.token)).data
    const producto = productos.find(producto => producto.ID === productoNotaDebito.Producto)

    const nuevoProductoNotaDebito = {
      FechaCreacion: new Date(),
      CodigoBarra: producto.CodigoBarra,
      Descripcion: producto.Descripcion,
      Cantidad: productoNotaDebito.Cantidad,
      Costo: productoNotaDebito.Costo,
      NotaDebito: productoNotaDebito.NotaDebito,
      Producto: productoNotaDebito.Producto,
    }
    await this.productoNotaDebitoRP.insert(nuevoProductoNotaDebito)
  }

}