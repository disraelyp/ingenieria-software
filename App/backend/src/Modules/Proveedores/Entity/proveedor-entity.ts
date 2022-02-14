import  { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

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
}