import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductoService } from './Services/producto.service'
import { ProductoEntity } from './Entity/producto-entity'
import { ProductosController } from './Controller/producto.controller'
import { CantidadProductoController } from './Controller/cantidadProducto.controller'
import { CostoProductoController } from './Controller/costoProducto.controller'

@Module({
  imports:[
    TypeOrmModule.forFeature([ProductoEntity])
  ],
  controllers: [
    ProductosController, CantidadProductoController, CostoProductoController
  ],
  providers:[
    ProductoService
  ]
})
export class ProductosModule {}