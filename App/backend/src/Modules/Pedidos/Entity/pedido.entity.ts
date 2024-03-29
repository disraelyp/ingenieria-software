import { ClienteEntity } from 'src/Modules/Clientes/Entity/cliente-entity'
import { historialPagoEntity } from 'src/Modules/HistorialPagos/Entity/historialPago-entity'
import { ProductoPedidoEntity } from 'src/Modules/ProductosPedido/Entity/producto-pedido.entity'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm'

@Entity('pedido')
export class PedidoEntity {
    @PrimaryGeneratedColumn()
      ID: number

    @Column()
      FechaCreacion: Date

    @Column()
      FechaModificacion: Date

    @Column()
      Vendedor: string

    @Column()
      Estado: string

    @Column()
      Pagado: boolean

    @ManyToOne(() => ClienteEntity, clientePedido => clientePedido.Pedidos)
      Cliente: ClienteEntity[]

    @OneToMany(() => historialPagoEntity, clientePedido => clientePedido.Pedido)
      Pagos: historialPagoEntity[]

    @OneToMany(() => ProductoPedidoEntity, productoPedido => productoPedido.Pedido)
      Productos: ProductoPedidoEntity[]

}