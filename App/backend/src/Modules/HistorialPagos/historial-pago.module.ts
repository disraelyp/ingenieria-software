import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { HistorialPagosService } from './Services/historialPagos.service'
import { HistorialPagoController } from './Controller/historialPago.controller'
import { historialPagoEntity } from './Entity/historialPago-entity'

@Module({
  imports:[
    TypeOrmModule.forFeature([historialPagoEntity])
  ],
  controllers: [
    HistorialPagoController
  ],
  providers:[
    HistorialPagosService
  ]
})
export class historialPagoModule {}