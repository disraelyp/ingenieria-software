import { CompraEntity } from 'src/Modules/Compras/Entity/compra.entity'
import { NotaDebitoEntity } from 'src/Modules/NotaDebito/Entity/nota-debito.entity'
import  { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity('proveedor')
export class ProveedorEntity {
    @PrimaryGeneratedColumn()
      ID: number

    @Column()
      RNC: string

    @Column()
      Nombre: string

    @Column()
      Telefono: string

    @Column()
      Direccion: string

    @Column()
      Activo: boolean

    @OneToMany(() => CompraEntity, compraProveedor => compraProveedor.Proveedor)
      Compras: CompraEntity[]

    @OneToMany(() => NotaDebitoEntity, compraProveedor => compraProveedor.Proveedor)
      NotaDebito: NotaDebitoEntity[]

}