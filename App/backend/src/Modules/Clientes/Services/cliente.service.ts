import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { validateToken } from 'src/Utils/validateToken'
import { Repository } from 'typeorm'
import ClienteEntity from '../Entity/cliente-entity'

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

    if (!cliente.cedula) {
      return { message: 'Ingrese la cedula del cliente', error: 401 }
    }

    if (!cliente.nombre) {
      return { message: 'Ingrese el nombre del cliente', error: 401 }
    }

    if (!cliente.direccion) {
      return { message: 'Ingrese la direccion del cliente', error: 401 }
    }

    if (!cliente.telefono1) {
      return { message: 'Ingrese el telefono 1 del cliente', error: 401 }
    }
    if (!cliente.telefono2) {
      return { message: 'Ingrese el telefono 2 del cliente', error: 401 }
    }

    const clientes = await this.clienteRP.find()

    const nickNames = clientes.map((cliente) => cliente.cedula)
    if (nickNames.includes(cliente.cedula)) {
      return {
        message: 'El cliente ingresano se encuentra disponible.',
        error: 401,
      }
    }

    const nuevocliente: any = {
      cedula: cliente.cedula,
      nombre: cliente.nombre,
      direccion: cliente.direccion,
      telefono1: cliente.telefono1,
      telefono2: cliente.telefono2,
      activo: true,
    }

    await this.clienteRP.insert(nuevocliente)
    return (await this.clienteRP.find()).find(
      (item) => item.cedula === cliente.cedula,
    )
  }

  async updatecliente(id: number, object: any) {
    if(validateToken(object, ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }

    if (!object.cedula) {
      return { message: 'Ingrese la cedula del cliente', error: 401 }
    }

    if (!object.nombre) {
      return { message: 'Ingrese el nombre del cliente', error: 401 }
    }

    if (!object.direccion) {
      return { message: 'Ingrese la provincia del cliente', error: 401 }
    }

    if (!object.telefono1) {
      return { message: 'Ingrese el telefono 1 del cliente', error: 401 }
    }

    if (!object.telefono2) {
      return { message: 'Ingrese el telefono 2 del cliente', error: 401 }
    }

    const clientes = await this.clienteRP.find()
    const cliente = clientes.find((cliente) => cliente.ID === id)
    if (!cliente) {
      return { Message: 'Ingrese un ID valido', error: 401 }
    }

    if (
      clientes.find(
        (cliente) => cliente.ID !== id && cliente.cedula === object.cedula,
      )
    ) {
      return { message: 'Ingrese una cedula valida', error: 401 }
    }
    const nuevocliente: any = {
      cedula: cliente.cedula,
      nombre: cliente.nombre,
      direccion: cliente.direccion,
      telefono1: cliente.telefono1,
      telefono2: cliente.telefono2,
      activo: true,
    }
    await this.clienteRP.update(id, nuevocliente)

    return (await this.clienteRP.find()).find((item) => item.ID === id)
  }

  async findAll(token: any){
    if(validateToken(token,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    const clientes = await this.clienteRP.find()
    return  (clientes.map(cliente => ({ 'ID': cliente.ID,'Cedula':cliente.cedula ,'Nombre': cliente.nombre, 'Direccion': cliente.direccion, 'Telefono 1': cliente.telefono1, 'Telefono 2': cliente.telefono2, 'Activo': cliente.activo }))).filter(cliente => cliente.Activo)
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
