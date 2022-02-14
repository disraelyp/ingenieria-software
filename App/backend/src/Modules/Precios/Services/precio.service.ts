import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { validateToken } from 'src/Utils/validateToken'
import { Repository } from 'typeorm'
import PrecioEntity from '../Entity/precio-entity'

const dotenv = require('dotenv')
dotenv.config()

@Injectable()
export class PrecioService {
  constructor(
    @InjectRepository(PrecioEntity)
    private readonly precioRP: Repository<PrecioEntity>,
  ) {}

  async savePrecio(precio: any) {
    // Donde dice administrador me imagino que también irán los supervisores
    if(validateToken(precio,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }

    if (!precio.ID_producto) {
      return { message: 'Ingrese el codigo de producto', error: 401 }
    }

    if (!precio.precio) {
      return { message: 'Ingrese el precio del producto', error: 401 }
    }

    if (!precio.impuesto) {
      return { message: 'Ingrese el impuesto del precio', error: 401 }
    }
    if (!precio.categpria) {
      return { message: 'Ingrese la categoria del precio', error: 401 }
    }

    const precios = await this.precioRP.find()

    const nickNames = precios.map((precio) => precio.ID)
    if (nickNames.includes(precio.ID)) {
      return {
        message: 'El codigo de precio ingresado no se encuentra disponible.',
        error: 401,
      }
    }

    const nuevoPrecio: any = {
      ID_producto: precio.ID_producto,
      precio: precio.precio,
      impuesto: precio.impuesto,
      categpria: precio.categoria,
      activo: true,
    }

    await this.precioRP.insert(nuevoPrecio)
    return (await this.precioRP.find()).find(
      (item) => item.ID === precio.ID,
    )
  }

  async updatePrecio(id: number, object: any) {
    if(validateToken(object, ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }

    if (!object.ID_producto) {
      return { message: 'Ingrese el codigo de producto', error: 401 }
    }

    if (!object.precio) {
      return { message: 'Ingrese el precio del producto', error: 401 }
    }

    if (!object.impuesto) {
      return { message: 'Ingrese el impuesto del precio', error: 401 }
    }
    if (!object.categpria) {
      return { message: 'Ingrese la categoria del precio', error: 401 }
    }


    const precios = await this.precioRP.find()
    const precio = precios.find((precio) => precio.ID === id)
    if (!precio) {
      return { Message: 'Ingrese un ID valido', error: 401 }
    }

    if (precios.find((precio) => precio.ID !== id )) {
      return { message: 'Ingrese una cedula valida', error: 401 }
    }
    const nuevoPrecio: any = {
      ID_producto: object.ID_producto,
      precio: object.precio,
      impuesto: object.impuesto,
      categpria: object.categoria,
      activo: true,
    }
    await this.precioRP.update(id, nuevoPrecio)

    return (await this.precioRP.find()).find((item) => item.ID === id)
  }

  async findAll(token: any){
    if(validateToken(token,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    const precios = await this.precioRP.find()
    return  (precios.map(precio => ({ 'ID': precio.ID,'Codigo producto':precio.ID_producto ,'Precio': precio.precio, 'Impuesto': precio.impuesto, 'Categoria': precio.categpria, 'Activo': precio.activo }))).filter(precios => precios.Activo)
  }

  async deletePrecio(token: any, id:number){
    if(validateToken(token,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    const precios = await this.precioRP.find()
    const precio = precios.find(precio => precio.ID === id)
    if(precio){
      const nuevoPrecio = { ...precio, Activo: false }
      await this.precioRP.update(id, nuevoPrecio)
      return precio
    }
    return { Message: 'Ingrese un ID valido', error: 401 }
  }
}
