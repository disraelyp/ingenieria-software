import { DevolucionEntity } from 'src/Modules/Devoluciones/Entity/devolucion.entity'
import { ProductoEntity } from 'src/Modules/Productos/Entity/producto-entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

@Entity('producto-devolucion')
export class ProductoDevolucionEntity {
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

  @Column()
    Precio: number

  @Column()
    Impuesto: number

  @ManyToOne(() => DevolucionEntity, devolucion => devolucion.Productos)
    Devolucion: DevolucionEntity

  @ManyToOne(() => ProductoEntity, producto => producto.ProductosDevolucion)
    Producto: ProductoEntity

}