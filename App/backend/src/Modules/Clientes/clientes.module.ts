import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ClienteService } from './Services/cliente.service'
<<<<<<< HEAD
import ClienteEntity from './Entity/cliente-entity'
import { ClienteController } from './Controller/cliente.controller'
=======
import { ClienteController } from './Controller/cliente.controller'
import { ClienteEntity } from './Entity/cliente-entity'
>>>>>>> e8b1dce96a4672e953bcbeffcffe50752eaac1f4

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