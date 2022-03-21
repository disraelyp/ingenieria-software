import { ProductoPedidoEntity } from 'src/Modules/ProductosPedido/Entity/producto-pedido.entity'
import { PrecioEntity } from 'src/Modules/Precios/Entity/precio-entity'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity('producto')
export class ProductoEntity {
  @PrimaryGeneratedColumn()
    ID: number

  @Column()
    CodigoBarra: string

  @Column()
    Descripcion: string

  @Column()
    Cantidad: number

  @Column()
    Costo: number

  @Column()
    FechaCreacion: Date

  @Column()
    FechaModificacion: Date

  @Column()
    Categoria: string

  @Column()
    Origen: string

  @Column()
    Activo: boolean

  @OneToMany(() => PrecioEntity, precio => precio.Producto)
    Precios: PrecioEntity[]

  @OneToMany(() => ProductoPedidoEntity, productoPedido => productoPedido.Producto)
    ProductoPedidos: ProductoPedidoEntity[]
}