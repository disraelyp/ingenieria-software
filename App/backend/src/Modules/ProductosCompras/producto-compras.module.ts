import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductCompraController } from './Controller/producto-compra.controller'
import { ProductoCompraEntity } from './Entity/producto-compra.entity'
import { ProductoCompraService } from './Services/producto-compra.service'

@Module({
  imports:[
    TypeOrmModule.forFeature([ProductoCompraEntity])
  ],
  controllers: [
    ProductCompraController
  ],
  providers:[
    ProductoCompraService
  ]
})
export class ProductoCompraModule {}