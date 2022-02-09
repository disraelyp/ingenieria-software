import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common'

import { ClienteService } from '../Services/cliente.service'
import ClienteModel from '../Models/cliente.model'

@Controller('Clientes')
export class ClienteController {
  constructor(private clienteServices: ClienteService) {}

  @Post()
  addCliente(@Body() clienteModel: ClienteModel): any {
    return this.clienteServices.saveCliente(clienteModel)
  }
  @Get(':token')
  getClientes(@Param() params): any {
    return this.clienteServices.findAll({ token: params.token })
  }
  @Put(':id')
  updateCliente(@Body() clienteModel: ClienteModel, @Param() params,): any {
    return this.clienteServices.updatecliente(params.id, clienteModel)
  }
  @Delete(':id')
  deleteCliente(@Body() token: any, @Param() params): any {
    return this.clienteServices.deleteCliente(token, params.id)
  }
}
