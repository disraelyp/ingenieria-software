import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common'

import { ClienteService } from '../Services/cliente.service'
import ClienteModel from '../Models/cliente.model'

@Controller('Proveedores')
export class ClienteController {
  constructor(private clienteServices: ClienteService) {}

  @Post()
  addProveedor(@Body() clienteModel: ClienteModel): any {
    return this.clienteServices.saveCliente(clienteModel)
  }
  @Get(':token')
  getConductor(@Param() params): any {
    return this.clienteServices.findAll({ token: params.token })
  }
  @Put(':id')
  updateProduct(@Body() token: any, @Body() clienteModel: ClienteModel, @Param() params,): any {
    return this.clienteServices.updatecliente(params.id, clienteModel)
  }
  @Delete(':id')
  deleteProducto(@Body() token: any, @Param() params): any {
    return this.clienteServices.deleteCliente(token, params.id)
  }
}
