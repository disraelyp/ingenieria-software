import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ClienteService } from './Services/cliente.service'
import ClienteEntity from './Entity/cliente-entity'
import { ClienteController } from './Controller/cliente.controller'

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