import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('producto')
export class ProductoEntity {
  @PrimaryGeneratedColumn()
    ID: number

  @Column()
    CodigoBarra: string

  @Column()
    Descripcion: string

  @Column()
    FechaCreacion: Date

  @Column()
    FechaModificacion: Date

  @Column()
    Categoria: string

  @Column()
    Activo: boolean
}

// PRECIO
// PRECIO 2
// PRECIO 3
// PRECIO 4
// IMPUESTOS
