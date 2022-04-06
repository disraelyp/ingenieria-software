import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import PedidoModel from '../Models/pedido.module'
import { DevolucionService } from '../Services/devolucion.service'


@Controller('Devoluciones')
export class DevolucionController {
  constructor(private devolucionSerive: DevolucionService) {}

  @Post()
  addPedidos(@Body() pedidoModel: PedidoModel): any {
    return this.devolucionSerive.saveDevolucion(pedidoModel)
  }

  @Get(':token')
  getPedidos(@Param() params): any {
    return this.devolucionSerive.findAll({ 'token': params.token })
  }

}
