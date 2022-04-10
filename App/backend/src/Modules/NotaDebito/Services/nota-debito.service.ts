import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { validateToken } from 'src/Utils/validateToken'
import { Repository } from 'typeorm'
import { NotaDebitoEntity } from '../Entity/nota-debito.entity'
import axios from 'axios'
import { verificarProductoPedido } from 'src/Utils/verificarProductoPedido'

const dotenv = require('dotenv')
dotenv.config()

@Injectable()
export class notaDebitoService {
  constructor(
    @InjectRepository(NotaDebitoEntity)
    private readonly notaDebitoRP: Repository<NotaDebitoEntity>,
  ) {}

  async findAll(token: any) {
    // VERIFICACION DEL TOKEN
    if(validateToken(token,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    return await this.notaDebitoRP.find({ relations: ['Proveedor', 'Productos'] })
  }

  async saveNotaDebito(notaDebito: any){

    // VERIFICACION DEL TOKEN
    if(validateToken(notaDebito,  ['Administrador', 'Cajera']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    if (!notaDebito.Comprador || typeof notaDebito.Comprador !== 'string') {
      return { message: 'Ingrese el comprador de la nota de debito', error: 401 }
    }
    if(!notaDebito.Productos || !Array.isArray(notaDebito.Productos)){
      return { message: 'Listado de productos invalido', error: 401 }
    }
    const productos = (notaDebito.Productos).map(precio => verificarProductoPedido(precio))
    if(productos.includes(false)){
      return { message: 'Formato de los productos invalido', error: 401 }
    }
    if (!notaDebito.Proveedor  || typeof notaDebito.Proveedor !== 'number') {
      return { message: 'Ingrese un proveedor', error: 401 }
    }
    const nuevaNotaDebito: any = {
      Proveedor: notaDebito.Proveedor,
      FechaCreacion: new Date(),
      Comprador: notaDebito.Comprador,
    }
    const notaDebitoIngresada = await this.notaDebitoRP.save(nuevaNotaDebito)
    for (let a = 0; a < notaDebito.Productos.length; a++) {
      const element = notaDebito.Productos[a]
      const request = {
        'token': notaDebito.token,
        'Cantidad': parseInt(element.Cantidad)*-1
      }
      await axios.put('http://localhost:3001/Cantidad-Producto/'+element.Producto, request)
    }

    for (let b = 0; b < notaDebito.Productos.length; b++) {
      await axios.post('http://localhost:3001/producto-nota-debito', { NotaDebito: notaDebitoIngresada.ID, ...notaDebito.Productos[b], token:  notaDebito.token })
    }
    return notaDebitoIngresada
  }

}