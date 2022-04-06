import { Controller, Post, Body } from '@nestjs/common'

import { ProductoDevolucionService } from '../Services/producto-devolucion.service'
import productoPedidoModel from '../Models/producto-devolucion.model'

@Controller('producto-devoluciones')
export class ProductoPedidoController {
  constructor(private productoDevolucionServices: ProductoDevolucionService) {}

  @Post()
  addProductoDevolucion(@Body() precioModel: productoPedidoModel): any {
    return this.productoDevolucionServices.createProductoDevolucion(precioModel)
  }



}
