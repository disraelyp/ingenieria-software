import { ProductoCompraEntity } from 'src/Modules/ProductosCompras/Entity/producto-compra.entity'
import { ProveedorEntity } from 'src/Modules/Proveedores/Entity/proveedor-entity'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm'

@Entity('compra')
export class CompraEntity {
    @PrimaryGeneratedColumn()
      ID: number

    @Column()
      FechaCreacion: Date

    @Column()
      Comprador: string

    @Column()
      Termino: string

    @Column()
      Pagado: boolean

    @ManyToOne(() => ProveedorEntity, proveedorPedido => proveedorPedido.Compras)
      Proveedor: ProveedorEntity[]

    @OneToMany(() => ProductoCompraEntity, productoCompra => productoCompra.Compra)
      Productos: ProductoCompraEntity[]

}