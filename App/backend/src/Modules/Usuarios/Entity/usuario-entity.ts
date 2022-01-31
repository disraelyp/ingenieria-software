import  { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('usuario')
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
      ID: number

    @Column()
      Nombre: string

    @Column()
      Usuario: string

    @Column()
      Password: string

      @Column()
        Role: string

    @Column()
      Activo: boolean

}