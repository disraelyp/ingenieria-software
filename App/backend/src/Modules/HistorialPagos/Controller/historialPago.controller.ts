import { Controller, Get, Post, Param, Body } from '@nestjs/common'

import { HistorialPagosService } from '../Services/historialPagos.service'
import HistorialPagosModel from '../Models/HistorialPagos.model'

@Controller('HistoralPagos')
export class HistorialPagoController {
  constructor(private HistorialPagosServices: HistorialPagosService) {}

  @Post()
  addPago(@Body() pagoModel: HistorialPagosModel): any {
    return this.HistorialPagosServices.crearDeuda(pagoModel)
  }
  @Get(':token')
  getDeudas(@Param() params): any {
    return this.HistorialPagosServices.findAll({ token: params.token })
  }
}
