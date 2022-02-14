import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common'

import { PrecioService } from '../Services/precio.service'
import PrecioModel from '../Models/precio.model'

@Controller('Precios')
export class PrecioController {
  constructor(private precioServices: PrecioService) {}

  @Post()
  addPrecio(@Body() precioModel: PrecioModel): any {
    return this.precioServices.savePrecio(precioModel)
  }
  @Get(':token')
  getPrecio(@Param() params): any {
    return this.precioServices.findAll({ token: params.token })
  }
  @Put(':id')
  updatePrecio(@Body() token: any, @Body() precioModel: PrecioModel, @Param() params,): any {
    return this.precioServices.updatePrecio(params.id, precioModel)
  }
  @Delete(':id')
  deletePrecio(@Body() token: any, @Param() params): any {
    return this.precioServices.deletePrecio(token, params.id)
  }
}
