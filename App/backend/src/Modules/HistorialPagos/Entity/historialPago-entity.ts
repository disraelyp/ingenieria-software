import { ClienteEntity } from 'src/Modules/Clientes/Entity/cliente-entity'
import { PedidoEntity } from 'src/Modules/Pedidos/Entity/pedido.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

@Entity('historial-pago')
export class historialPagoEntity {
  @PrimaryGeneratedColumn()
    ID: number

  @Column()
    Fecha: Date

  @Column()
    Descripcion: string

  @Column()
    Termino: number // Cantidad de dias

  @Column()
    PagoMinimo: number

  @Column()
    SaldoPendiente: number

  @Column()
    SaldoPagado: number

  @Column()
    Pendiente: boolean

  @Column()
    Vendedor: string

  @ManyToOne(() => ClienteEntity, Cliente => Cliente.Pagos)
    Cliente: ClienteEntity[]

  @ManyToOne(() => PedidoEntity, Pedido => Pedido.Pagos)
    Pedido: PedidoEntity[]
}
