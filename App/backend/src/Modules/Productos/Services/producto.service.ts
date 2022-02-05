import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { validateToken } from 'src/Utils/validateToken'
import { Repository } from 'typeorm'
import ProductoEntity from '../Entity/producto-entity'
import { Categorias } from '../Enums/Categorias'

const dotenv = require('dotenv')
dotenv.config()

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(ProductoEntity)
    private readonly productoRP: Repository<ProductoEntity>,
  ) {}

  async saveProducto(producto: any) {
    // Donde dice administrador me imagino que también irán los supervisores
    if(validateToken(producto,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }

    if (!producto.nombre) {
      return { message: 'Ingrese el nombre del producto', error: 401 }
    }

    if (!producto.fechaCreacion) {
      return { message: 'Ingrese la fecha de creacion del producto', error: 401 }
    }

    if (!producto.categoria) {
      return { message: 'Ingrese la categoria del producto', error: 401 }
    }

    if(![Categorias.Golosinas, Categorias.Lacteos].includes(producto.Categorias)){
      return { message: 'Ingrese una categoria de producto valido', error: 401 }
    }
    const productos = await this.productoRP.find()

    const nickNames = productos.map((producto) => producto.ID)
    if (nickNames.includes(producto.ID)) {
      return {
        message: 'El producto ingresano se encuentra disponible.',
        error: 401,
      }
    }

    const nuevoProducto: any = {
      nombre: producto.nombre,
      fechaCreacion: new Date(),
      categoria: producto.categoria,
      activo: true
    }

    await this.productoRP.insert(nuevoProducto)
    return (await this.productoRP.find()).find(
      (item) => item.ID === producto.ID,
    )
  }

  async updateProducto(id: number, object: any) {
    if(validateToken(object, ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }

    if (!object.nombre) {
      return { message: 'Ingrese el nombre del producto', error: 401 }
    }

    if (!object.fechaCreacion) {
      return { message: 'Ingrese la fecha de creacion del producto', error: 401 }
    }

    if (!object.categoria) {
      return { message: 'Ingrese la categoria del producto', error: 401 }
    }

    if(![Categorias.Golosinas, Categorias.Lacteos].includes(object.Categorias)){
      return { message: 'Ingrese una categoria de producto valido', error: 401 }
    }
    const productos = await this.productoRP.find()
    const producto = productos.find((producto) => producto.ID === id)
    if (!producto) {
      return { Message: 'Ingrese un ID valido', error: 401 }
    }

    if (
      productos.find(
        (producto) => producto.ID !== id
      )
    ) {
      return { message: 'Ingrese un ID válido valida', error: 401 }
    }
    const nuevoProducto: any = {
      nombre: producto.nombre,
      fechaCreacion: new Date(),
      categoria: producto.categoria,
      activo: true
    }

    await this.productoRP.update(id, nuevoProducto)

    return (await this.productoRP.find()).find((item) => item.ID === id)
  }

  async findAll(token: any){
    if(validateToken(token,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    const productos = await this.productoRP.find()
    return  (productos.map(producto => ({ 'ID': producto.ID, 'Nombre': producto.nombre, 'Fecha Creacion': producto.fechaCreacion.toDateString(), 'Categoria': producto.categoria,  'Activo': producto.activo }))).filter(producto => producto.Activo)
  }

  async deleteProducto(token: any, id:number){
    if(validateToken(token,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    const productos = await this.productoRP.find()
    const producto = productos.find(producto => producto.ID === id)
    if(producto){
      const nuevoProducto = { ...producto, Activo: false }
      await this.productoRP.update(id, nuevoProducto)
      return producto
    }
    return { Message: 'Ingrese un ID valido', error: 401 }
  }
}
