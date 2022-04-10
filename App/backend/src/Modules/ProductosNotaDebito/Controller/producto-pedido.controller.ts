import { Controller, Post, Body } from '@nestjs/common'

import { ProductoNotaDebitoService } from '../Services/producto-nota-debito.service'
import productoNotaDebitoModel from '../Models/producto-nota-debito.model'

@Controller('producto-nota-debito')
export class ProductoNotaDebitoController {
  constructor(private productoDevolucionServices: ProductoNotaDebitoService) {}

  @Post()
  addProductoDevolucion(@Body() precioModel: productoNotaDebitoModel): any {
    return this.productoDevolucionServices.createProductoNotaDebito(precioModel)
  }

}
