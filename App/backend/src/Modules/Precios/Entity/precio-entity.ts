import { ProductoEntity } from 'src/Modules/Productos/Entity/producto-entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

@Entity('precio')
export class PrecioEntity {
  @PrimaryGeneratedColumn()
    ID: number

  @Column()
    Precio: number

  @Column()
    Impuesto: number

  @Column()
    Categoria: string

  @ManyToOne(() => ProductoEntity, producto => producto.Precios)
    Producto: ProductoEntity
}
