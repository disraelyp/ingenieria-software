import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductoPedidoController } from './Controller/producto-pedido.controller'
import { ProductoPedidoEntity } from './Entity/producto-pedido.entity'
import { ProductoPedidoService } from './Services/producto-pedido.service'

@Module({
  imports:[
    TypeOrmModule.forFeature([ProductoPedidoEntity])
  ],
  controllers: [
    ProductoPedidoController
  ],
  providers:[
    ProductoPedidoService
  ]
})
export class ProductoPedidoModule {}