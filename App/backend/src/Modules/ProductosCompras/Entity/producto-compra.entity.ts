
import { CompraEntity } from 'src/Modules/Compras/Entity/compra.entity'
import { ProductoEntity } from 'src/Modules/Productos/Entity/producto-entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

@Entity('producto-compra')
export class ProductoCompraEntity {
  @PrimaryGeneratedColumn()
    ID: number

  @Column()
    FechaCreacion: Date

  @Column()
    CodigoBarra: string

  @Column()
    Descripcion: string

  @Column()
    Cantidad: number

  @Column()
    Costo: number

  @ManyToOne(() => CompraEntity, compra => compra.Productos)
    Compra: CompraEntity

  @ManyToOne(() => ProductoEntity, producto => producto.ProductosCompras)
    Producto: ProductoEntity

}