import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('cliente')
export default class ProductoEntity {
  @PrimaryGeneratedColumn()
    ID: number

  @Column()
    nombre: string

  @Column()
    fechaCreacion: Date

  @Column()
    categoria: string

  @Column()
    activo: boolean
}
