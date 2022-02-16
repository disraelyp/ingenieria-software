import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { validateToken } from 'src/Utils/validateToken'
import { Repository } from 'typeorm'
import { PrecioEntity } from '../Entity/precio-entity'

const dotenv = require('dotenv')
dotenv.config()

@Injectable()
export class PrecioService {
  constructor(
    @InjectRepository(PrecioEntity)
    private readonly precioRP: Repository<PrecioEntity>,
  ) {}

  async savePrecio(precio: any) {
    if(validateToken(precio,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    if (!precio.Producto) {
      return { message: 'Ingrese el codigo de producto', error: 401 }
    }
    if (!precio.Precio) {
      return { message: 'Ingrese el precio del producto', error: 401 }
    }
    if (!precio.Impuesto) {
      return { message: 'Ingrese el impuesto del precio', error: 401 }
    }
    if (!precio.Categoria) {
      return { message: 'Ingrese la categoria del precio', error: 401 }
    }
    const nuevoPrecio: any = {
      Producto: precio.Producto,
      Precio: precio.Precio,
      Impuesto: precio.Impuesto,
      Categoria: precio.Categoria,
    }
    await this.precioRP.insert(nuevoPrecio)
  }

  async deletePrecio(token: any, id:number){
    if(validateToken(token,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    const precio = await this.precioRP.findOne(id)
    console.log(precio)
    if(precio){
      await this.precioRP.delete(id)
    }
    return { Message: 'Ingrese un ID valido', error: 401 }
  }
}
