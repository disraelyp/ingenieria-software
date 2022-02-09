import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { validateToken } from 'src/Utils/validateToken'
import { Repository } from 'typeorm'
import { ClienteEntity } from '../Entity/cliente-entity'

const dotenv = require('dotenv')
dotenv.config()

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(ClienteEntity)
    private readonly clienteRP: Repository<ClienteEntity>,
  ) {}

  async saveCliente(cliente: any) {
    // Donde dice administrador me imagino que también irán los supervisores
    if(validateToken(cliente,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    if (!cliente.Cedula) {
      return { message: 'Ingrese la cedula del cliente', error: 401 }
    }
    if (!cliente.Nombre) {
      return { message: 'Ingrese el nombre del cliente', error: 401 }
    }
    if (!cliente.Direccion) {
      return { message: 'Ingrese la Direccion del cliente', error: 401 }
    }
    if (!cliente.Telefono) {
      return { message: 'Ingrese el telefono del cliente', error: 401 }
    }

    const clientes = await this.clienteRP.find()

    const nickNames = clientes.map((cliente) => cliente.Cedula)
    if (nickNames.includes(cliente.Cedula)) {
      return {
        message: 'El cliente ingresano se encuentra disponible.',
        error: 401,
      }
    }

    const nuevocliente: any = {
      Cedula: cliente.Cedula,
      Nombre: cliente.Nombre,
      Direccion: cliente.Direccion,
      Telefono: cliente.Telefono,
      Activo: true,
    }

    await this.clienteRP.insert(nuevocliente)
    return (await this.clienteRP.find()).find(
      (item) => item.Cedula === cliente.Cedula,
    )
  }

  async updatecliente(id: number, object: any) {
    if(validateToken(object, ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    if (!object.Cedula) {
      return { message: 'Ingrese la cedula del cliente', error: 401 }
    }
    if (!object.Nombre) {
      return { message: 'Ingrese el nombre del cliente', error: 401 }
    }
    if (!object.Direccion) {
      return { message: 'Ingrese la provincia del cliente', error: 401 }
    }
    if (!object.Telefono) {
      return { message: 'Ingrese el telefono 1 del cliente', error: 401 }
    }

    const clientes = await this.clienteRP.find()
    const cliente = clientes.find((cliente) => cliente.ID === id)
    if (!cliente) {
      return { Message: 'Ingrese un ID valido', error: 401 }
    }
    if (clientes.find((cliente) => cliente.ID !== id && cliente.Cedula === object.Cedula,)) {
      return { message: 'Ingrese una Cedula valida', error: 401 }
    }

    const nuevocliente: any = {
      Cedula: cliente.Cedula,
      Nombre: cliente.Nombre,
      Direccion: cliente.Direccion,
      Telefono: cliente.Telefono,
      Activo: true,
    }
    await this.clienteRP.update(id, nuevocliente)

    return (await this.clienteRP.find()).find((item) => item.ID === id)
  }

  async findAll(token: any){
    if(validateToken(token,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    const clientes = await this.clienteRP.find()
    return  (clientes.map(cliente => ({ 'ID': cliente.ID,'Cedula':cliente.Cedula ,'Nombre': cliente.Nombre, 'Direccion': cliente.Direccion, 'Telefono': cliente.Telefono, 'Activo': cliente.Activo }))).filter(cliente => cliente.Activo)
  }
  async deleteCliente(token: any, id:number){
    if(validateToken(token,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    const clientes = await this.clienteRP.find()
    const cliente = clientes.find(cliente => cliente.ID === id)
    if(cliente){
      const nuevocliente = { ...cliente, Activo: false }
      await this.clienteRP.update(id, nuevocliente)
      return cliente
    }
    return { Message: 'Ingrese un ID valido', error: 401 }
  }
}
