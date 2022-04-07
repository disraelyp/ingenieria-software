import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { validateToken } from 'src/Utils/validateToken'
import { Repository } from 'typeorm'
import { CompraEntity } from '../Entity/compra.entity'
import axios from 'axios'
import { verificarProductoPedido } from 'src/Utils/verificarProductoPedido'

const dotenv = require('dotenv')
dotenv.config()


@Injectable()
export class CompraService {
  constructor(
    @InjectRepository(CompraEntity)
    private readonly compraRP: Repository<CompraEntity>,
  ) {}


  async findAll(token: any) {
    // VERIFICACION DEL TOKEN
    if(validateToken(token,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    return await this.compraRP.find({ relations: ['Productos', 'Proveedor'] })
  }

  async saveCompra(compra: any){

    // VERIFICACION DEL TOKEN
    if(validateToken(compra,  ['Administrador', 'Cajera']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    if (!compra.Comprador || typeof compra.Comprador !== 'string') {
      return { message: 'Ingrese el comprador de la compra', error: 401 }
    }
    if (!compra.Termino || typeof compra.Termino !== 'string') {
      return { message: 'Ingrese el termino de la compra', error: 401 }
    }
    if(!compra.Productos || !Array.isArray(compra.Productos)){
      return { message: 'Listado de productos invalido', error: 401 }
    }
    const productos = (compra.Productos).map(precio => verificarProductoPedido(precio))
    if(productos.includes(false)){
      return { message: 'Formato de los productos invalido', error: 401 }
    }
    if (!compra.Proveedor  || typeof compra.Proveedor !== 'number') {
      return { message: 'Ingrese un proveedor', error: 401 }
    }
    const nuevaCompra: any = {
      Proveedor: compra.Proveedor,
      FechaCreacion: new Date(),
      Comprador: compra.Comprador,
      Termino: compra.Termino,
      Pagado: false
    }
    const compraIngresada = await this.compraRP.save(nuevaCompra)
    for (let a = 0; a < compra.Productos.length; a++) {
      const element = compra.Productos[a]
      const request = {
        'token': compra.token,
        'Cantidad': parseInt(element.Cantidad)
      }
      await axios.put('http://localhost:3001/Cantidad-Producto/'+element.Producto, request)
    }
    for (let b = 0; b < compra.Productos.length; b++) {
      const element = compra.Productos[b]
      const request = {
        'token': compra.token,
        'Costo': parseInt(element.Costo)
      }
      await axios.put('http://localhost:3001/Costo-Producto/+'+element.Producto, request)
    }
    for (let b = 0; b < compra.Productos.length; b++) {
      await axios.post('http://localhost:3001/producto-compras', { Compra: compraIngresada.ID, ...compra.Productos[b], token:  compra.token })
    }
    return compraIngresada
  }




  async cambiarEstado(object: any){

    // Verificacion de token
    if(validateToken(object,  ['Administrador', 'Cajera']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    // verificacion de estado
    if (!object.Pagado || typeof object.Pagado !== 'boolean') {
      return { message: 'Ingrese el estado de la compra', error: 401 }
    }
    // Verificacion de ID
    if (!object.ID || typeof object.ID !== 'number') {
      return { message: 'Ingrese el ID de la compra', error: 401 }
    }

    const compras = await this.compraRP.find()
    const compra = compras.find(compra => compra.ID === parseInt(object.ID))


    if(!compra){
      return { Message: 'Ingrese un ID valido', error: 401 }
    }

    const compranModificado = {
      Pagado: object.Pagado
    }
    await this.compraRP.update(compra.ID, compranModificado)
    return await this.compraRP.findOne(object.ID)
  }
}