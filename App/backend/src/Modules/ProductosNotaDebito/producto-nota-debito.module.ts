import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductoNotaDebitoController } from './Controller/producto-pedido.controller'
import { ProductoNotaDebitoEntity } from './Entity/producto-nota-debito.entity'
import { ProductoNotaDebitoService } from './Services/producto-nota-debito.service'

@Module({
  imports:[
    TypeOrmModule.forFeature([ProductoNotaDebitoEntity])
  ],
  controllers: [
    ProductoNotaDebitoController
  ],
  providers:[
    ProductoNotaDebitoService
  ]
})
export class ProductoNotaDebitoModule {}