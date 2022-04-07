import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import PedidoModel from '../Models/compra.model'
import { CompraService } from '../Services/compra.service'


@Controller('Compras')
export class CompraController {
  constructor(private compraServices: CompraService) {}

  @Post()
  addPedidos(@Body() pedidoModel: PedidoModel): any {
    return this.compraServices.saveCompra(pedidoModel)
  }

  @Get(':token')
  getPedidos(@Param() params): any {
    return this.compraServices.findAll({ 'token': params.token })
  }

}
