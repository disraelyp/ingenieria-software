import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductoService } from './Services/producto.service'
import { ProductoEntity } from './Entity/producto-entity'
import { ProductosController } from './Controller/producto.controller'

@Module({
  imports:[
    TypeOrmModule.forFeature([ProductoEntity])
  ],
  controllers: [
    ProductosController
  ],
  providers:[
    ProductoService
  ]
})
export class ProductosModule {}