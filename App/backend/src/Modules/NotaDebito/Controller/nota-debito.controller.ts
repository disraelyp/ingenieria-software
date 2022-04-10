import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import PedidoModel from '../Models/nota-debito.model'
import { notaDebitoService } from '../Services/nota-debito.service'


@Controller('nota-debito')
export class NotaDebitoController {
  constructor(private notaDebito: notaDebitoService) {}

  @Post()
  addPedidos(@Body() pedidoModel: PedidoModel): any {
    return this.notaDebito.saveNotaDebito(pedidoModel)
  }

  @Get(':token')
  getPedidos(@Param() params): any {
    return this.notaDebito.findAll({ 'token': params.token })
  }

}
