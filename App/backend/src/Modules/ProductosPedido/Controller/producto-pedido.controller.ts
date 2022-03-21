import { Controller, Post, Delete, Param, Body } from '@nestjs/common'

import { ProductoPedidoService } from '../Services/producto-pedido.service'
import productoPedidoModel from '../Models/producto-pedido.model'

@Controller('producto-pedidos')
export class ProductoPedidoController {
  constructor(private precioServices: ProductoPedidoService) {}

  @Post()
  addProductoPedido(@Body() precioModel: productoPedidoModel): any {
    return this.precioServices.createProductoPedido(precioModel)
  }
  @Delete(':id')
  deleteProductoPedido(@Body() token: any, @Param() params): any {
    return this.precioServices.deletProductoPedido(token, params.id)
  }
}
