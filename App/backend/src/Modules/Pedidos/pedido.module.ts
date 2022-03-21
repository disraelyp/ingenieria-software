import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PedidoController } from './Controller/pedido.controller'
import { PedidoEntity } from './Entity/pedido.entity'
import { PedidoService } from './Services/pedido.service'


@Module({
  imports:[
    TypeOrmModule.forFeature([PedidoEntity])
  ],
  controllers: [
    PedidoController
  ],
  providers:[
    PedidoService
  ]
})
export class PedidoModule {}