import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import PedidoModel from '../Models/pedido.module'
import { PedidoService } from '../Services/pedido.service'


@Controller('Pedidos')
export class PedidoController {
  constructor(private pedidoService: PedidoService) {}

  @Post()
  addPrecio(@Body() precioModel: PedidoModel): any {
    return this.pedidoService.savePedido(precioModel)
  }

  @Get(':token')
  getClientes(@Param() params): any {
    return this.pedidoService.findAll({ 'token': params.token })
  }


}
