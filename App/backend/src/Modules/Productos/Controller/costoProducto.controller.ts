import { Controller, Put, Param, Body } from '@nestjs/common'
import { ProductoService } from '../Services/producto.service'

@Controller('Costo-Producto')
export class CostoProductoController {
  constructor(private productosServices: ProductoService) {}
  @Put(':id')
  updateProducto(@Body() Cantidad: any, @Param() params,): any {
    return this.productosServices.changeCosto(params.id, Cantidad)
  }
}
