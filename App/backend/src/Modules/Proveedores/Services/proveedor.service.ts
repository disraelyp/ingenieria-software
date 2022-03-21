import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { validateToken } from 'src/Utils/validateToken'
import { Repository } from 'typeorm'
import { ProveedorEntity } from '../Entity/proveedor-entity'

const dotenv = require('dotenv')
dotenv.config()

@Injectable()
export class ProveedorService {
  constructor(
    @InjectRepository(ProveedorEntity)
    private readonly proveedorRP: Repository<ProveedorEntity>,
  ) {}

  async saveProveedor(proveedor: any) {
    if(validateToken(proveedor,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    if (!proveedor.RNC) {
      return { message: 'Ingrese el rnc del proveedor', error: 401 }
    }
    if (!proveedor.Nombre) {
      return { message: 'Ingrese el nombre del proveedor', error: 401 }
    }
    if (!proveedor.Telefono) {
      return { message: 'Ingrese el telefono del proveedor', error: 401 }
    }
    if (!proveedor.Direccion) {
      return { message: 'Ingrese la direccion del proveedor', error: 401 }
    }
    const proveedores = await this.proveedorRP.find()
    const RNCS = proveedores.map((Proveedor) => Proveedor.RNC)
    if (RNCS.includes(proveedor.rnc)) {
      return {
        message: 'El RNC ingresado no se encuentra disponible.',
        error: 401,
      }
    }
    const nuevoProveedor: any = {
      RNC: proveedor.RNC,
      Nombre: proveedor.Nombre,
      Telefono: proveedor.Telefono,
      Direccion: proveedor.Direccion,
      Activo: true,
    }
    await this.proveedorRP.insert(nuevoProveedor)
    return (await this.proveedorRP.find()).find((item) => item.RNC === proveedor.RNC, )
  }

  async updateProveedor(id: number, object: any) {
    if(validateToken(object,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    if (!object.RNC) {
      return { message: 'Ingrese el rnc del proveedor', error: 401 }
    }
    if (!object.Nombre) {
      return { message: 'Ingrese el nombre del proveedor', error: 401 }
    }
    if (!object.Telefono) {
      return { message: 'Ingrese el telefono del proveedor', error: 401 }
    }
    if (!object.Direccion) {
      return { message: 'Ingrese la direccion del proveedor', error: 401 }
    }
    const proveedores = await this.proveedorRP.find()
    const proveedor = proveedores.find((proveedor) => proveedor.ID === id)
    if (!proveedor) {
      return { Message: 'Ingrese un ID valido', error: 401 }
    }
    if (proveedores.find((proveedor) => proveedor.ID !== id && proveedor.RNC === object.RNC,)) {
      return { message: 'Ingrese un RNC valido', error: 401 }
    }
    const nuevoProveedor: any = {
      RNC: proveedor.RNC,
      Nombre: proveedor.Nombre,
      Telefono: proveedor.Telefono,
      Direccion: proveedor.Direccion,
      Activo: true,
    }
    await this.proveedorRP.update(id, nuevoProveedor)
    return (await this.proveedorRP.find()).find((item) => item.ID === id)
  }

  async findAll(token: any){
    if(validateToken(token,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    const proveedores = await this.proveedorRP.find()
    return  (proveedores.map(proveedor => (
      { 'ID': proveedor.ID,
        'RNC':proveedor.RNC ,
        'Nombre': proveedor.Nombre,
        'Telefono': proveedor.Telefono,
        'Direccion': proveedor.Direccion,
        'Activo': proveedor.Activo
      }))).filter(proveedor => proveedor.Activo)
  }

  async deleteProveedor(token: any, id:number){
    if(validateToken(token,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    const proveedores = await this.proveedorRP.find()
    const proveedor = proveedores.find(proveedor => proveedor.ID === id)
    if(proveedor){
      const nuevoProveedor = { ...proveedor, Activo: false }
      await this.proveedorRP.update(id, nuevoProveedor)
      return proveedor
    }
    return { Message: 'Ingrese un ID valido', error: 401 }
  }
}