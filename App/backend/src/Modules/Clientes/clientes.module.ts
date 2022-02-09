import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ClienteService } from './Services/cliente.service'
import { ClienteController } from './Controller/cliente.controller'
import { ClienteEntity } from './Entity/cliente-entity'

@Module({
  imports:[
    TypeOrmModule.forFeature([ClienteEntity])
  ],
  controllers: [
    ClienteController
  ],
  providers:[
    ClienteService
  ]
})
export class ClientesModule {}