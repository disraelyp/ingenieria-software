import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'

import { UsuariosModule } from '../Usuarios/usuarios.module'
import { UsuarioEntity } from '../Usuarios/Entity/usuario-entity'

const dotenv = require('dotenv')
dotenv.config()

@Module({
  imports:[
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities:[
        UsuarioEntity
			 ],
    }),
    UsuariosModule
  ]
})
export class DatabaseModule {
  constructor( private readonly connection:Connection){
  }
}