import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('cliente')
export default class ClienteEntity {
  @PrimaryGeneratedColumn()
    ID: number

  @Column()
    cedula: string

  @Column()
    nombre: string

  @Column()
    direccion: string

  @Column()
    telefono1: string

  @Column()
    telefono2: string

  @Column()
    activo: boolean
}
