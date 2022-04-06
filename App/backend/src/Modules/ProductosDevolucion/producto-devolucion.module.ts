import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductoPedidoController } from './Controller/producto-pedido.controller'
import { ProductoDevolucionEntity } from './Entity/producto-devolucion.entity'
import { ProductoDevolucionService } from './Services/producto-devolucion.service'

@Module({
  imports:[
    TypeOrmModule.forFeature([ProductoDevolucionEntity])
  ],
  controllers: [
    ProductoPedidoController
  ],
  providers:[
    ProductoDevolucionService
  ]
})
export class ProductoDevolucionModule {}