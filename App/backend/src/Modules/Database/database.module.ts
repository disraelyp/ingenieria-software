import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'

import { UsuariosModule } from '../Usuarios/usuarios.module'
import { UsuarioEntity } from '../Usuarios/Entity/usuario-entity'

import { ProductosModule } from '../Productos/productos.module'
import { ProductoEntity } from '../Productos/Entity/producto-entity'

import { ProveedorEntity } from '../Proveedores/Entity/proveedor-entity'
import { ProveedoresModule } from '../Proveedores/proveedores.module'

import { ClientesModule } from '../Clientes/clientes.module'
import { ClienteEntity } from '../Clientes/Entity/cliente-entity'

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
        UsuarioEntity, ProductoEntity, ProveedorEntity, ClienteEntity
			 ],
    }),
    UsuariosModule, ProductosModule, ProveedoresModule, ClientesModule
  ]
})
export class DatabaseModule {
  constructor( private readonly connection:Connection){
  }
}