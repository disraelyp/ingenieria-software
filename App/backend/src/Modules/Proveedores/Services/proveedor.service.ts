import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { validateToken } from 'src/Utils/validateToken'
import { Repository } from 'typeorm'
import ProveedorEntity from '../Entity/proveedor-entity'

const dotenv = require('dotenv')
dotenv.config()

@Injectable()
export class ProveedorService {
  constructor(
    @InjectRepository(ProveedorEntity)
    private readonly proveedorRP: Repository<ProveedorEntity>,
  ) {}

  async saveProveedor(proveedor: any) {
    // Donde dice administrador me imagino que también irán los supervisores
    if(validateToken(proveedor,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }

    if (!proveedor.rnc) {
      return { message: 'Ingrese el rnc del proveedor', error: 401 }
    }

    if (!proveedor.nombre) {
      return { message: 'Ingrese el nombre del proveedor', error: 401 }
    }
    if (!proveedor.telefono1) {
      return { message: 'Ingrese el telefono 1 del proveedor', error: 401 }
    }
    if (!proveedor.telefono2) {
      return { message: 'Ingrese el telefono 2 del proveedor', error: 401 }
    }
    if (!proveedor.provincia) {
      return { message: 'Ingrese la provincia del proveedor', error: 401 }
    }

    if (!proveedor.municipio) {
      return { mesage: 'Ingrese el municipio del proveedor', error: 401 }
    }

    if (!proveedor.sector) {
      return { mesage: 'Ingrese el sector del proveedor', error: 401 }
    }

    if (!proveedor.calle) {
      return { mesage: 'Ingrese la calle del proveedor', error: 401 }
    }

    const proveedores = await this.proveedorRP.find()

    const nickNames = proveedores.map((Proveedor) => Proveedor.rnc)
    if (nickNames.includes(proveedor.rnc)) {
      return {
        message: 'El proveedor ingresano se encuentra disponible.',
        error: 401,
      }
    }

    const nuevoProveedor: any = {
      rnc: proveedor.rnc,
      nombre: proveedor.nombre,
      telefono1: proveedor.telefono1,
      telefono2: proveedor.telefono2,
      provincia: proveedor.provincia,
      municipio: proveedor.municipio,
      sector: proveedor.sector,
      calle: proveedor.calle,
      activo: true,
    }

    await this.proveedorRP.insert(nuevoProveedor)
    return (await this.proveedorRP.find()).find(
      (item) => item.rnc === proveedor.rnc,
    )
  }

  async updateProveedor(id: number, object: any) {
    if(validateToken(object, ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }

    if (!object.rnc) {
      return { message: 'Ingrese el rnc del proveedor', error: 401 }
    }

    if (!object.nombre) {
      return { message: 'Ingrese el nombre del proveedor', error: 401 }
    }

    if (!object.telefono1) {
      return { message: 'Ingrese el telefono 1 del proveedor', error: 401 }
    }

    if (!object.telefono2) {
      return { message: 'Ingrese el telefono 2 del proveedor', error: 401 }
    }

    if (!object.provincia) {
      return { message: 'Ingrese la provincia del proveedor', error: 401 }
    }

    if (!object.municipio) {
      return { mesage: 'Ingrese el municipio del proveedor', error: 401 }
    }

    if (!object.sector) {
      return { mesage: 'Ingrese el sector del proveedor', error: 401 }
    }

    if (!object.calle) {
      return { mesage: 'Ingrese la calle del proveedor', error: 401 }
    }

    const proveedores = await this.proveedorRP.find()
    const proveedor = proveedores.find((proveedor) => proveedor.ID === id)
    if (!proveedor) {
      return { Message: 'Ingrese un ID valido', error: 401 }
    }

    if (
      proveedores.find(
        (proveedor) => proveedor.ID !== id && proveedor.rnc === object.rnc,
      )
    ) {
      return { message: 'Ingrese un rnc valido', error: 401 }
    }
    const nuevoProveedor: any = {
      rnc: object.rnc,
      nombre: object.nombre,
      telefono1: object.telefono1,
      telefono2: object.telefono2,
      provincia: object.provincia,
      municipio: object.municipio,
      sector: object.sector,
      calle: object.calle,
      activo: true,
    }
    await this.proveedorRP.update(id, nuevoProveedor)

    return (await this.proveedorRP.find()).find((item) => item.ID === id)
  }

  async findAll(token: any){
    if(validateToken(token,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    const proveedores = await this.proveedorRP.find()
    return  (proveedores.map(proveedor => ({ 'ID': proveedor.ID,'RNC':proveedor.rnc ,'Nombre': proveedor.nombre, 'Telefono 1': proveedor.telefono1, 'Telefono 2': proveedor.telefono2, 'Provincia': proveedor.provincia, 'Municipio': proveedor.municipio, 'Sector': proveedor.sector, 'Calle': proveedor.calle, 'Activo': proveedor.activo }))).filter(proveedor => proveedor.Activo)
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
