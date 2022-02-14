import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('precio')
export default class PrecioEntity {
  @PrimaryGeneratedColumn()
    ID: number
  @Column()
    ID_producto: number
  @Column()
    precio: number
  @Column()
    impuesto: number
  @Column()
    categpria: string
  @Column()
    activo: boolean
}
