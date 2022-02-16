import { Controller, Put, Param, Body } from '@nestjs/common'
import { ProductoService } from '../Services/producto.service'

@Controller('Cantidad-Producto')
export class CantidadProductoController {
  constructor(private productosServices: ProductoService) {}
  @Put(':id')
  updateProducto(@Body() Cantidad: any, @Param() params,): any {
    return this.productosServices.updateCantidad(params.id, Cantidad)
  }
}
