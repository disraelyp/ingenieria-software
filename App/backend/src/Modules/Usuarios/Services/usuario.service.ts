import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from  'typeorm'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { UsuarioEntity } from '../Entity/usuario-entity'
import { validateToken } from 'src/Utils/validateToken'
import { RolesEnum } from '../Enums/Roles'

const dotenv = require('dotenv')
dotenv.config()

@Injectable()
export class UsuarioService {
  constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRP:Repository<UsuarioEntity>
  ) {}

  async saveUsuario(usuario:any){
    if(validateToken(usuario,  ['Administrador']) === false) {
      //return { message: 'token missing or invalid', error: 401 }
    }
    if(!usuario.Nombre) {
      return { message: 'Ingrese el nombre del usuario', error: 401 }
    }
    if(!usuario.Usuario) {
      return { message: 'Ingrese el usuario para el incio de seccion', error: 401 }
    }
    if(!usuario.Password) {
      return { message: 'Ingrese la constraseña del usuario', error: 401 }
    }
    if(!usuario.Role) {
      return { message: 'Ingrese el role del usuario', error: 401 }
    }
    if(![RolesEnum.Cajera, RolesEnum.Administrador, RolesEnum.Almacenista].includes(usuario.Role)){
      return { message: 'Ingrese un role de usuario valido', error: 401 }
    }

    const usuarios = await this.usuarioRP.find()
    const nickNames = usuarios.map(Usuario => Usuario.Usuario)
    if(nickNames.includes(usuario.Usuario)){
      return { message: 'El usuario ingresado no se encuentra disponible.', error: 401 }
    }

    const nuevoUsuario: any = {
      Nombre: usuario.Nombre,
      Usuario: usuario.Usuario,
      Password: await bcrypt.hash(usuario.Password, 10),
      Role: usuario.Role,
      Activo: true
    }

    await this.usuarioRP.insert(nuevoUsuario)
    return (await this.usuarioRP.find()).find(item => item.Usuario === usuario.Usuario)
  }

  async authUsuario(auth: any){
    if(!auth.Usuario){
      return { message: 'Ingrese el usuario para el incio de seccion', error: 401 }
    }
    if(!auth.Password) {
      return { message: 'Ingrese la constraseña del usuario', error: 401 }
    }
    const usuario = (await this.usuarioRP.find()).find(usuario => auth.Usuario === usuario.Usuario)
    if(!usuario) {
      return  { message: 'Ingrese un nombre de Usuario valido', error: 401 }
    }
    if(await bcrypt.compare(auth.Password, usuario.Password)){
      const user = { 'ID': usuario.ID, 'Nombre': usuario.Nombre, 'Usuario': usuario.Usuario, 'Role': usuario.Role, 'Activo': usuario.Activo }
      const token =  jwt.sign(user, process.env.SECRET)
      return { token, user }
    } else {
      return { message: 'Contraseña/Usuario incorrecto, intentelo de nuevo.', error: 401 }
    }
  }

  async updateUsuario(id:number, object:any){
    if(validateToken(object, ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    if(!object.Nombre) {
      return { message: 'Ingrese el nombre del usuario', error: 401 }
    }
    if(!object.Usuario) {
      return { message: 'Ingrese el usuario para el incio de seccion', error: 401 }
    }
    if(!object.Password) {
      return { message: 'Ingrese la constraseña del usuario', error: 401 }
    }
    if(!object.Rol) {
      return { message: 'Ingrese el role del usuario', error: 401 }
    }
    if(![RolesEnum.Cajera, RolesEnum.Administrador, RolesEnum.Cajera].includes(object.Rol)){
      return { message: 'Ingrese un role de usuario valido', error: 401 }
    }

    const usuarios = await this.usuarioRP.find()
    const usuario = usuarios.find(usuario => usuario.ID === id)
    if(!usuario) {
      return { Message: 'Ingrese un ID valido', error: 401 }
    }
    if(usuarios.find(usuario => usuario.ID !== id && usuario.Usuario === object.Usuario)){
      return { message: 'Ingrese un nombre de usuario valido', error: 401 }
    }
    const nuevoUsuario: any = { Nombre: object.Nombre, Usuario: object.Usuario, Password: await bcrypt.hash(object.Password, 10), Role: object.Rol, Activo: true }
    await this.usuarioRP.update(id, nuevoUsuario)

    return (await this.usuarioRP.find()).find(item => item.ID === id)
  }

  async findAll(token: any){
    if(validateToken(token,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    const usuarios = await this.usuarioRP.find()
    return  (usuarios.map(usuario => ({ 'ID': usuario.ID, 'Nombre': usuario.Nombre, 'Usuario': usuario.Usuario, 'Role': usuario.Role, 'Activo': usuario.Activo }))).filter(usuario => usuario.Activo)
  }

  async deleteUsuario(token: any, id:number){
    if(validateToken(token,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    const usuarios = await this.usuarioRP.find()
    const usuario = usuarios.find(usuario => usuario.ID === id)
    if(usuario){
      const nuevoUsuario = { ...usuario, Activo: false }
      await this.usuarioRP.update(id, nuevoUsuario)
      return usuario
    }
    return { Message: 'Ingrese un ID valido', error: 401 }
  }
}
