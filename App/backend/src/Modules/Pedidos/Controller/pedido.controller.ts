import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import PedidoModel from '../Models/pedido.module'
import { PedidoService } from '../Services/pedido.service'


@Controller('Pedidos')
export class PedidoController {
  constructor(private pedidoService: PedidoService) {}

  @Post()
  addPedidos(@Body() precioModel: PedidoModel): any {
    return this.pedidoService.savePedido(precioModel)
  }

  @Get(':token')
  getPedidos(@Param() params): any {
    return this.pedidoService.findAll({ 'token': params.token })
  }


}
