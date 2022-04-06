import { Controller, Body, Post } from '@nestjs/common'
import { PedidoService } from '../Services/pedido.service'


@Controller('PedidoEstado')
export class PedidoEstadoController {
  constructor(private pedidoService: PedidoService) {}

  @Post()
  updatePedido(@Body() pedidoModel: any): any {
    return this.pedidoService.cambiarEstado(pedidoModel)
  }
}
