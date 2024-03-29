import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common'

import { ProductoService } from '../Services/producto.service'
import { ProductoModel } from '../Model/producto.model'

@Controller('Productos')
export class ProductosController {
  constructor(private productosServices: ProductoService) {}

  @Post()
  addProducto(@Body() productosModel: ProductoModel): any {
    return this.productosServices.saveProducto(productosModel)
  }
  @Get(':token')
  getProductos(@Param() params): any {
    return this.productosServices.findAll({ token: params.token })
  }
  @Put(':id')
  updateProducto(@Body() productosModel: ProductoModel, @Param() params,): any {
    return this.productosServices.updateProducto(params.id, productosModel)
  }
  @Delete(':id')
  deleteProducto(@Body() token: any, @Param() params): any {
    return this.productosServices.deleteProducto(token, params.id)
  }
}
