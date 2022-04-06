import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'

// USUARIOS
import { UsuariosModule } from '../Usuarios/usuarios.module'
import { UsuarioEntity } from '../Usuarios/Entity/usuario-entity'

// PRODUCTOS
import { ProductosModule } from '../Productos/productos.module'
import { ProductoEntity } from '../Productos/Entity/producto-entity'

// PROVEEDOR
import { ProveedorEntity } from '../Proveedores/Entity/proveedor-entity'
import { ProveedoresModule } from '../Proveedores/proveedores.module'

// CLIENTES
import { ClientesModule } from '../Clientes/clientes.module'
import { ClienteEntity } from '../Clientes/Entity/cliente-entity'

// PRECIO
import { PrecioModule } from '../Precios/precios.module'
import { PrecioEntity } from '../Precios/Entity/precio-entity'

// PRODUCTOS-PEDIDO
import { ProductoPedidoModule } from '../ProductosPedido/producto-pedido.module'
import { ProductoPedidoEntity } from '../ProductosPedido/Entity/producto-pedido.entity'

// PEDIDOS
import { PedidoModule } from '../Pedidos/pedido.module'
import { PedidoEntity } from '../Pedidos/Entity/pedido.entity'

// HISTORIAL DE PAGOS
import { historialPagoModule } from '../HistorialPagos/historial-pago.module'
import { historialPagoEntity } from '../HistorialPagos/Entity/historialPago-entity'

// DEVOLUCIONES
import { DevolucionEntity } from '../Devoluciones/Entity/devolucion.entity'
import { DevolucionModule } from '../Devoluciones/devolucion.module'

// PRODUCTOS-DEVOLUCION

import { ProductoDevolucionEntity } from '../ProductosDevolucion/Entity/producto-devolucion.entity'
import { ProductoDevolucionModule } from '../ProductosDevolucion/producto-devolucion.module'

const dotenv = require('dotenv')
dotenv.config()

@Module({
  imports:[
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities:[
        historialPagoEntity, DevolucionEntity, UsuarioEntity, ProductoEntity, ProveedorEntity, ClienteEntity, PrecioEntity, ProductoPedidoEntity, PedidoEntity, ProductoDevolucionEntity
			 ],
    }),
    historialPagoModule, DevolucionModule, ProductoDevolucionModule, UsuariosModule, ProductosModule, ProveedoresModule, ClientesModule, PrecioModule, ProductoPedidoModule, PedidoModule
  ]
})
export class DatabaseModule {
  constructor( private readonly connection:Connection){
  }
}