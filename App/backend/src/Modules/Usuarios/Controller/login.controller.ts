import { Controller, Post, Body } from '@nestjs/common'
import { UsuarioService } from '../Services/usuario.service'
import { LoginModel } from 'src/Modules/Usuarios/Model/login.model'


@Controller('Login')
export class LoginController {

  constructor(private usuarioServices:UsuarioService){}
    @Post()
  authUser(@Body() loginModel:LoginModel):any {
    return this.usuarioServices.authUsuario(loginModel)
  }
}
