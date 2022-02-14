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
<<<<<<< HEAD
    origen: string

  @Column()
    activo: boolean
=======
    FechaModificacion: Date

  @Column()
    Categoria: string

  @Column()
    Activo: boolean
>>>>>>> e8b1dce96a4672e953bcbeffcffe50752eaac1f4
}

// PRECIO
// PRECIO 2
// PRECIO 3
// PRECIO 4
// IMPUESTOS
