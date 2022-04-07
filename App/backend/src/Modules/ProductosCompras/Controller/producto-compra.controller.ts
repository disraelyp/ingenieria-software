import { Controller, Post, Body } from '@nestjs/common'

import { ProductoCompraService } from '../Services/producto-compra.service'
import productoCompraModel from '../Models/producto-compra.model'

@Controller('producto-compras')
export class ProductCompraController {
  constructor(private productoCompraServices: ProductoCompraService) {}

  @Post()
  addProductoCompra(@Body() model: productoCompraModel): any {
    return this.productoCompraServices.createProductoCompra(model)
  }

}
