import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DevolucionController } from './Controller/devolucion.controller'
import { DevolucionEntity } from './Entity/devolucion.entity'
import { DevolucionService } from './Services/devolucion.service'

@Module({
  imports:[
    TypeOrmModule.forFeature([DevolucionEntity])
  ],
  controllers: [
    DevolucionController
  ],
  providers:[
    DevolucionService
  ]
})
export class DevolucionModule {}