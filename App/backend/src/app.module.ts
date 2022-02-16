import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { DatabaseModule } from './Modules/Database/database.module'
import { UsuariosModule } from './Modules/Usuarios/usuarios.module'
import { ProveedoresModule } from './Modules/Proveedores/proveedores.module'
import { ProductosModule } from './Modules/Productos/productos.module'
import { ClientesModule } from './Modules/Clientes/clientes.module'
import { PrecioModule } from './Modules/Precios/precios.module'

@Module({
  imports: [
    UsuariosModule, DatabaseModule, ProveedoresModule, ProductosModule, ClientesModule, PrecioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
