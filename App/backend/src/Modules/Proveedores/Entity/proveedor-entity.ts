import  { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('proveedor')
export default class ProveedorEntity {
    @PrimaryGeneratedColumn()
      ID: number

    @Column()
      rnc: string

    @Column()
      nombre: string

    @Column()
      telefono1: string

    @Column()
      telefono2: string

    @Column()
      provincia: string

    @Column()
      municipio: string

    @Column()
      sector: string

    @Column()
      calle: string

    @Column()
      activo: boolean
}