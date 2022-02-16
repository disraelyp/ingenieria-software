import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PrecioService } from './Services/precio.service'
import { PrecioEntity } from './Entity/precio-entity'
import { PrecioController } from './Controller/precio.controller'

@Module({
  imports:[
    TypeOrmModule.forFeature([PrecioEntity])
  ],
  controllers: [
    PrecioController
  ],
  providers:[
    PrecioService
  ]
})
export class PrecioModule {}