import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common'

import { ProveedorService } from '../Services/proveedor.service'
import ProveedorModel from '../Models/proveedor.model'

@Controller('Proveedores')
export class ProveedorController {
  constructor(private proveedorServices: ProveedorService) {}

  @Post()
  addProveedor(@Body() proveedorModel: ProveedorModel): any {
    return this.proveedorServices.saveProveedor(proveedorModel)
  }
  @Get(':token')
  getProveedores(@Param() params): any {
    return this.proveedorServices.findAll({ token: params.token })
  }
  @Put(':id')
  updateProveedor(@Body() proveedorModel: ProveedorModel, @Param() params,): any {
    return this.proveedorServices.updateProveedor(params.id, proveedorModel)
  }
  @Delete(':id')
  deleteProveedore(@Body() token: any, @Param() params): any {
    return this.proveedorServices.deleteProveedor(token, params.id)
  }
}
