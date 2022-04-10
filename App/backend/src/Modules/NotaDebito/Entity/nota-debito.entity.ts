import { ProductoNotaDebitoEntity } from 'src/Modules/ProductosNotaDebito/Entity/producto-nota-debito.entity'
import { ProveedorEntity } from 'src/Modules/Proveedores/Entity/proveedor-entity'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm'

@Entity('nota-debito')
export class NotaDebitoEntity {
    @PrimaryGeneratedColumn()
      ID: number

    @Column()
      FechaCreacion: Date

    @Column()
      Comprador: string

    @ManyToOne(() => ProveedorEntity, proveedorPedido => proveedorPedido.NotaDebito)
      Proveedor: ProveedorEntity[]

    @OneToMany(() => ProductoNotaDebitoEntity, productoNotaDebitoEntity => productoNotaDebitoEntity.NotaDebito)
      Productos: ProductoNotaDebitoEntity[]

}