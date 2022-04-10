import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductoDevolucionController } from './Controller/producto-pedido.controller'
import { ProductoDevolucionEntity } from './Entity/producto-devolucion.entity'
import { ProductoDevolucionService } from './Services/producto-devolucion.service'

@Module({
  imports:[
    TypeOrmModule.forFeature([ProductoDevolucionEntity])
  ],
  controllers: [
    ProductoDevolucionController
  ],
  providers:[
    ProductoDevolucionService
  ]
})
export class ProductoDevolucionModule {}