import { PedidoEntity } from 'src/Modules/Pedidos/Entity/pedido.entity'
import { ProductoEntity } from 'src/Modules/Productos/Entity/producto-entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

@Entity('producto-pedido')
export class ProductoPedidoEntity {
  @PrimaryGeneratedColumn()
    ID: number

  @Column()
    CodigoBarra: string

  @Column()
    Descripcion: string

  @Column()
    Cantidad: number

  @Column()
    Categoria: string

  @ManyToOne(() => PedidoEntity, pedido => pedido.Productos)
    Pedido: PedidoEntity

  @ManyToOne(() => ProductoEntity, producto => producto.ProductoPedidos)
    Producto: ProductoEntity

}