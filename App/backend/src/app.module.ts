import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { DatabaseModule } from './Modules/Database/database.module'
import { UsuariosModule } from './Modules/Usuarios/usuarios.module'
import { ProveedoresModule } from './Modules/Proveedores/proveedores.module'
import { ProductosModule } from './Modules/Productos/productos.module'
import { ClientesModule } from './Modules/Clientes/clientes.module'
import { PrecioModule } from './Modules/Precios/precios.module'
import { ProductoPedidoModule } from './Modules/ProductosPedido/producto-pedido.module'
import { PedidoModule } from './Modules/Pedidos/pedido.module'

@Module({
  imports: [
    UsuariosModule, DatabaseModule, ProveedoresModule, ProductosModule, ClientesModule, PrecioModule, ProductoPedidoModule, PedidoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
