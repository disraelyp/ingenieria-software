import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { validateToken } from 'src/Utils/validateToken'
import { Repository } from 'typeorm'
<<<<<<< HEAD
import ProductoEntity from '../Entity/producto-entity'
=======
import { ProductoEntity } from '../Entity/producto-entity'
import { Categorias } from '../Constants/Categorias'
>>>>>>> e8b1dce96a4672e953bcbeffcffe50752eaac1f4

const dotenv = require('dotenv')
dotenv.config()

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(ProductoEntity)
    private readonly productoRP: Repository<ProductoEntity>,
  ) {}

  async saveProducto(producto: any) {

    if(validateToken(producto,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    if (!producto.CodigoBarra) {
      return { message: 'Ingrese el codigo de barra del producto', error: 401 }
    }
    if (!producto.Descripcion) {
      return { message: 'Ingrese el nombre del producto', error: 401 }
    }
    if (!producto.FechaCreacion) {
      return { message: 'Ingrese la fecha de creacion del producto', error: 401 }
    }
    if (!producto.FechaModificacion) {
      return { message: 'Ingrese la fecha de creacion del producto', error: 401 }
    }
    if (!producto.Categoria) {
      return { message: 'Ingrese la categoria del producto', error: 401 }
    }
<<<<<<< HEAD

    if (!producto.origen) {
      return { message: 'Ingrese el origen del producto', error: 401 }
=======
    if(!Categorias.includes(producto.Categorias)){
      return { message: 'Ingrese una categoria de producto valido', error: 401 }
>>>>>>> e8b1dce96a4672e953bcbeffcffe50752eaac1f4
    }

    const productos = await this.productoRP.find()
    const codigoBarras = productos.map((producto) => producto.CodigoBarra)
    if (codigoBarras.includes(producto.CodigoBarra)) {
      return { message: 'El codigo de barras no se encuentra disponible.', error: 401, }
    }

    const nuevoProducto: any = {
<<<<<<< HEAD
      nombre: producto.nombre,
      fechaCreacion: new Date(),
      categoria: producto.categoria,
      origen: producto.origen,
      activo: true
=======
      CodigoBarra: producto.CodigoBarra,
      Descripcion: producto.Descripcion,
      FechaCreacion: producto.FechaCreacion,
      FechaModificacion: producto.FechaModificacion,
      Categoria: producto.Categoria
>>>>>>> e8b1dce96a4672e953bcbeffcffe50752eaac1f4
    }
    await this.productoRP.insert(nuevoProducto)
    return (await this.productoRP.find()).find(
      (item) => item.ID === producto.ID,
    )
  }

  async updateProducto(id: number, object: any) {
    if(validateToken(object,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    if (!object.CodigoBarra) {
      return { message: 'Ingrese el codigo de barra del producto', error: 401 }
    }
    if (!object.Descripcion) {
      return { message: 'Ingrese el nombre del producto', error: 401 }
    }
    if (!object.FechaCreacion) {
      return { message: 'Ingrese la fecha de creacion del producto', error: 401 }
    }
    if (!object.FechaModificacion) {
      return { message: 'Ingrese la fecha de creacion del producto', error: 401 }
    }
    if (!object.Categoria) {
      return { message: 'Ingrese la categoria del producto', error: 401 }
    }
<<<<<<< HEAD

    if (!object.origen) {
      return { message: 'Ingrese el origen del producto', error: 401 }
=======
    if(!Categorias.includes(object.Categorias)){
      return { message: 'Ingrese una categoria de producto valido', error: 401 }
>>>>>>> e8b1dce96a4672e953bcbeffcffe50752eaac1f4
    }

    const productos = await this.productoRP.find()
    const codigoBarras = productos.map((producto) => producto.CodigoBarra)
    const IDS = productos.map(producto => producto.ID)

    if (codigoBarras.includes(object.CodigoBarra)) {
      return { message: 'El codigo de barras no se encuentra disponible.', error: 401, }
    }
    if (IDS.includes(object.id)) {
      return { message: 'El codigo de barras no se encuentra disponible.', error: 401, }
    }


    const nuevoProducto: any = {
<<<<<<< HEAD
      nombre: object.nombre,
      fechaCreacion: new Date(),
      categoria: object.categoria,
      origen: object.origen,
      activo: true
=======
      CodigoBarra: object.CodigoBarra,
      Descripcion: object.Descripcion,
      FechaCreacion: object.FechaCreacion,
      FechaModificacion: object.FechaModificacion,
      Categoria: object.Categoria
>>>>>>> e8b1dce96a4672e953bcbeffcffe50752eaac1f4
    }

    await this.productoRP.update(id, nuevoProducto)
    return (await this.productoRP.find()).find((item) => item.ID === id)
  }

  async findAll(token: any){
    if(validateToken(token,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    const productos = await this.productoRP.find()
<<<<<<< HEAD
    return  (productos.map(producto => ({ 'ID': producto.ID, 'Nombre': producto.nombre, 'Fecha Creacion': producto.fechaCreacion.toDateString(), 'Categoria': producto.categoria,'Origen': producto.origen,  'Activo': producto.activo }))).filter(producto => producto.Activo)
=======
    return  (productos.map(producto => ({ 'ID': producto.ID, 'Descripcion': producto.Descripcion, 'Fecha Creacion': producto.FechaCreacion, 'Fecha Modificacion': producto.FechaModificacion, 'Categoria': producto.Categoria,  'Activo': producto.Activo }))).filter(producto => producto.Activo)
>>>>>>> e8b1dce96a4672e953bcbeffcffe50752eaac1f4
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
