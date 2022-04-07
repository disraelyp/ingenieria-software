import { Controller, Body, Post } from '@nestjs/common'
import { CompraService } from '../Services/compra.service'


@Controller('CompraEstado')
export class CompraEstadoController {
  constructor(private compraService: CompraService) {}


  @Post()
  updateCompra(@Body() compraModel: any): any {
    return this.compraService.cambiarEstado(compraModel)
  }
}
