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


  @OneToMany(() => PedidoEntity, clientePedido => clientePedido.Cliente)
    Pedidos: PedidoEntity[]
}
