import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { validateToken } from 'src/Utils/validateToken'
import { Repository } from 'typeorm'
import { historialPagoEntity } from '../Entity/historialPago-entity'
import axios from 'axios'

const dotenv = require('dotenv')
dotenv.config()

@Injectable()
export class HistorialPagosService {
  constructor(
    @InjectRepository(historialPagoEntity)
    private readonly pagoRP: Repository<historialPagoEntity>,
  ) {}

  async crearDeuda(pago: any) {
    if(validateToken(pago,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }

    if (!pago.Descripcion || typeof pago.Descripcion !== 'string') {
      return { message: 'Ingrese la descripcion de la deuda', error: 401 }
    }
    if (!pago.Vendedor || typeof pago.Vendedor !== 'string') {
      return { message: 'Ingrese el vendedor de facturacion', error: 401 }
    }
    if (!pago.Termino || typeof pago.Termino !== 'number') {
      return { message: 'Ingrese el termino de la deuda', error: 401 }
    }
    if (!pago.hasOwnProperty('PagoMinimo') || typeof pago.PagoMinimo !== 'number') {
      return { message: 'Ingrese el pago minimo de la deuda', error: 401 }
    }
    if (!pago.hasOwnProperty('SaldoPendiente') || typeof pago.SaldoPendiente !== 'number') {
      return { message: 'Ingrese el saldo pendiente de la deuda', error: 401 }
    }
    if (!pago.hasOwnProperty('SaldoPagado') || typeof pago.SaldoPagado !== 'number') {
      return { message: 'Ingrese el saldo ya pagado de la deuda', error: 401 }
    }
    if(!pago.hasOwnProperty('Pendiente') || typeof pago.Pendiente !== 'boolean') {
      return { message: 'Ingrese el estado de la deuda', error: 401 }
    }
    if (!pago.Cliente || typeof pago.Cliente !== 'number') {
      return { message: 'Ingrese el cliente de la deuda', error: 401 }
    }
    if (!pago.Pedido || typeof pago.Pedido !== 'number') {
      return { message: 'Ingrese el pedido de la deuda', error: 401 }
    }

    const nuevoPago: any = {
      Fecha: new Date(),
      Descripcion: pago.Descripcion,
      Termino: pago.Termino,
      PagoMinimo: pago.PagoMinimo,
      SaldoPendiente: pago.SaldoPendiente,
      SaldoPagado: pago.SaldoPagado,
      Pendiente: pago.Pendiente,
      Vendedor: pago.Vendedor,
      Cliente: pago.Cliente,
      Pedido: pago.Pedido
    }

    await this.pagoRP.save(nuevoPago)
    return this.pagoRP.find({ relations: ['Cliente'] })

  }

  async findAll(token: any){
    if(validateToken(token,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    return await this.pagoRP.find({ relations: ['Cliente', 'Pedido'] })
  }
}
