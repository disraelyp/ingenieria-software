import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CompraController } from './Controller/compra.controller'
import { CompraEstadoController } from './Controller/compraEstado.controller'
import { CompraEntity } from './Entity/compra.entity'
import { CompraService } from './Services/compra.service'

@Module({
  imports:[
    TypeOrmModule.forFeature([CompraEntity])
  ],
  controllers: [
    CompraController, CompraEstadoController
  ],
  providers:[
    CompraService
  ]
})
export class ComprasModule {}