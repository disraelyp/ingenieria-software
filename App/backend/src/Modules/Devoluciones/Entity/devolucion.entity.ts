import { ClienteEntity } from 'src/Modules/Clientes/Entity/cliente-entity'
import { ProductoDevolucionEntity } from 'src/Modules/ProductosDevolucion/Entity/producto-devolucion.entity'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm'

@Entity('devolucion')
export class DevolucionEntity {
    @PrimaryGeneratedColumn()
      ID: number

    @Column()
      FechaCreacion: Date

    @Column()
      Vendedor: string

    @Column()
      Pagado: boolean

    @ManyToOne(() => ClienteEntity, clientePedido => clientePedido.Pedidos)
      Cliente: ClienteEntity[]

    @OneToMany(() => ProductoDevolucionEntity, productoPedido => productoPedido.Devolucion)
      Productos: ProductoDevolucionEntity[]

}