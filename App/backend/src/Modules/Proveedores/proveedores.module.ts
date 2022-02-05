import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProveedorService } from './Services/proveedor.service'
import ProveedorEntity from './Entity/proveedor-entity'
import { ProveedorController } from './Controller/proveedor.controller'

@Module({
  imports:[
    TypeOrmModule.forFeature([ProveedorEntity])
  ],
  controllers: [
    ProveedorController
  ],
  providers:[
    ProveedorService
  ]
})
export class ProveedoresModule {}