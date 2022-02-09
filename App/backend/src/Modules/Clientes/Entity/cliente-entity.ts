import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('cliente')
export class ClienteEntity {
  @PrimaryGeneratedColumn()
    ID: number

  @Column()
    Cedula: string

  @Column()
    Nombre: string

  @Column()
    Direccion: string

  @Column()
    Telefono: string

  @Column()
    Activo: boolean
}
