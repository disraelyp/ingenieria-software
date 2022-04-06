import { DevolucionEntity } from 'src/Modules/Devoluciones/Entity/devolucion.entity'
import { historialPagoEntity } from 'src/Modules/HistorialPagos/Entity/historialPago-entity'
import { PedidoEntity } from 'src/Modules/Pedidos/Entity/pedido.entity'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity('cliente')
export class ClienteEntity {
  @PrimaryGeneratedColumn()
    ID: number

  @Column()
    Cedula: string

  @Column()
    Nombre: string

  @Column()
    Direccion: string

  @Column()
    Telefono: string

  @Column()
    Activo: boolean

  @OneToMany(() => historialPagoEntity, pagos => pagos.Cliente)
    Pagos: historialPagoEntity[]

  @OneToMany(() => PedidoEntity, clientePedido => clientePedido.Cliente)
    Pedidos: PedidoEntity[]

  @OneToMany(() => DevolucionEntity, clienteDevolucion => clienteDevolucion.Cliente)
    Devoluciones: PedidoEntity[]
}
