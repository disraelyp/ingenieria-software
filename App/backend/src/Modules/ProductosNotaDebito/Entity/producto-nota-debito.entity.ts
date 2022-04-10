import { NotaDebitoEntity } from 'src/Modules/NotaDebito/Entity/nota-debito.entity'
import { ProductoEntity } from 'src/Modules/Productos/Entity/producto-entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

@Entity('producto-nota-debito')
export class ProductoNotaDebitoEntity {
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

  @ManyToOne(() => NotaDebitoEntity, notaDebito => notaDebito.Productos)
    NotaDebito: NotaDebitoEntity

  @ManyToOne(() => ProductoEntity, producto => producto.ProductosNotaDevolucion)
    Producto: ProductoEntity

}