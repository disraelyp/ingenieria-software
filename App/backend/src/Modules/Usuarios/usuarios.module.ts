import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsuarioService } from './Services/usuario.service'
import { UsuarioEntity } from './Entity/usuario-entity'
import { UsuarioController } from './controller/usuario.controller'
import { LoginController } from './Controller/login.controller'


@Module({
  imports:[
    TypeOrmModule.forFeature([UsuarioEntity])
  ],
  controllers: [
    UsuarioController, LoginController
  ],
  providers:[
    UsuarioService
  ]
})
export class UsuariosModule {}