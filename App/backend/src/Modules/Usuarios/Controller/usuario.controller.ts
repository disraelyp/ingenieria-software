import { Controller,Get,Post,Put, Delete, Param,Body } from '@nestjs/common'

import { UsuarioService } from '../Services/usuario.service'
import { UsuarioModel } from '../Model/usuario.model'


@Controller('Usuarios')
export class UsuarioController {

  constructor(private usuarioServices:UsuarioService){}

    @Post()
  addProdut(@Body() usuarioModel:UsuarioModel):any{
    return this.usuarioServices.saveUsuario(usuarioModel)
  }
	@Get(':token')
    getConductor(@Param() params):any{
      return  this.usuarioServices.findAll({ 'token': params.token })
    }
	@Put(':id')
	updateProduct(@Body() token: any, @Body() usuarioModel:UsuarioModel, @Param() params):any{
	  return   this.usuarioServices.updateUsuario(params.id,usuarioModel)
	}
	@Delete(':id')
	deleteProducto(@Body() token: any, @Param() params):any{
	  return  this.usuarioServices.deleteUsuario(token, params.id)
	}
}
