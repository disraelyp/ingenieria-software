import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common'
import PedidoModel from '../Models/pedido.module'
import { PedidoService } from '../Services/pedido.service'


@Controller('Pedidos')
export class PedidoController {
  constructor(private pedidoService: PedidoService) {}

  @Post()
  addPedidos(@Body() pedidoModel: PedidoModel): any {
    return this.pedidoService.savePedido(pedidoModel)
  }

  @Get(':token')
  getPedidos(@Param() params): any {
    return this.pedidoService.findAll({ 'token': params.token })
  }

  @Put(':id')
  updatePedido(@Body() pedidoModel: any, @Param() params,): any {
    return this.pedidoService.updatePedido(params.id, pedidoModel)
  }

  @Delete(':id')
  deleteProductoPedido(@Body() token: any, @Param() params): any {
    return this.pedidoService.deletePedido(token, params.id)
  }

}
