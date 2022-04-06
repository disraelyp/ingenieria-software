import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { validateToken } from 'src/Utils/validateToken'
import { Repository } from 'typeorm'
import { ProductoEntity } from '../Entity/producto-entity'
import { Categorias, Origen } from '../Constants/Categorias'
import { verificarPrecio } from 'src/Utils/verificarPrecio'
import axios from 'axios'

const dotenv = require('dotenv')
dotenv.config()

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(ProductoEntity)
    private readonly productoRP: Repository<ProductoEntity>,
  ) {}

  async saveProducto(producto: any) {

    // VERIFICACION DEL TOKEN
    if(validateToken(producto,  ['Administrador', 'Almacenista']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }

    // VERIFICACION DEL OBJETO RECIBIDO
    if (!producto.CodigoBarra || typeof producto.CodigoBarra !== 'string') {
      return { message: 'Ingrese el codigo de barra del producto', error: 401 }
    }
    if (!producto.Descripcion || typeof producto.Descripcion !== 'string') {
      return { message: 'Ingrese el nombre del producto', error: 401 }
    }
    if (!producto.Categoria || typeof producto.Categoria !== 'string') {
      return { message: 'Ingrese la categoria del producto', error: 401 }
    }
    if (!producto.Origen || typeof producto.Origen !== 'string') {
      return { message: 'Ingrese el Origen del producto', error: 401 }
    }
    if(!producto.Costo || typeof producto.Costo !== 'number') {
      return { message: 'Ingrese un costo inicial', error: 401 }
    }

    // VERIFICACION DE QUE EL CODIGO DE BARRA SEA UNICO
    const codigosBarras = (await this.productoRP.find()).map(producto => producto.CodigoBarra)
    if(codigosBarras.includes(producto.CodigoBarra)){
      return { message: 'Ingrese un codigo de barra unico', error: 401 }
    }

    // VERIFICACION DE LOS PRECIOS
    if(!producto.Precios || !Array.isArray(producto.Precios) || producto.Precios.length !== 4){
      return { message: 'Listado de precios invalido', error: 401 }
    }
    const precios = (producto.Precios).map(precio => verificarPrecio(precio))
    if(precios.includes(false)){
      return { message: 'Formato de los precios invalido', error: 401 }
    }

    // VERIFICACION DE QUE LAS CATEGORIAS Y EL ORIGEN SEA VALIDO
    if (!Origen.includes(producto.Origen)) {
      return { message: 'Ingrese un origen del producto valido', error: 401 }
    }
    if(!Categorias.includes(producto.Categoria)){
      return { message: 'Ingrese una categoria de producto valido', error: 401 }
    }

    const nuevoProducto: any = {
      CodigoBarra: producto.CodigoBarra,
      Descripcion: producto.Descripcion,
      FechaCreacion: new Date(),
      FechaModificacion: new Date(),
      Categoria: producto.Categoria,
      Costo: producto.Costo,
      Cantidad: 0,
      Activo: true,
      Origen: producto.Origen
    }

    const productoIngresado = await this.productoRP.save(nuevoProducto)
    for (let index = 0; index < producto.Precios.length; index++) {
      await axios.post('http://localhost:3001/Precios', { ...producto.Precios[index], token:  producto.token, Producto: productoIngresado.ID })
    }
    return await this.productoRP.findOne(productoIngresado.ID, { relations: ['Precios'] })
  }

  async updateCantidad(id: any, object: any) {

    if(validateToken(object,  ['Administrador', 'Almacenista']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    const producto =await this.productoRP.findOne(parseInt(id))
    if(!producto){
      return { message: 'Ingrese un ID valido', error: 401 }
    }
    if(!object.Cantidad || typeof object.Cantidad !== 'number'){
      return { message: 'Ingrese una cantidad valida', error: 401 }
    }

    const produtoAlterado: any = {
      CodigoBarra: producto.CodigoBarra,
      Descripcion: producto.Descripcion,
      FechaCreacion: producto.FechaCreacion,
      FechaModificacion: producto.FechaModificacion,
      Cantidad: (producto.Cantidad + object.Cantidad),
      Categoria: producto.Categoria,
      Origen: producto.Origen
    }

    await this.productoRP.update(id, produtoAlterado)
    return await this.productoRP.findOne(id, { relations: ['Precios'] })
  }

  async updateProducto(id: number, object: any) {

    // VERIFICACION DEL TOKEN
    if(validateToken(object,  ['Administrador', 'Almacenista']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }

    // VERIFICACION DEL OBJETO RECIBIDO
    if (!object.CodigoBarra || typeof object.CodigoBarra !== 'string') {
      return { message: 'Ingrese el codigo de barra del producto', error: 401 }
    }
    if (!object.Descripcion || typeof object.Descripcion !== 'string') {
      return { message: 'Ingrese el nombre del producto', error: 401 }
    }
    if (!object.Categoria || typeof object.Categoria !== 'string') {
      return { message: 'Ingrese la categoria del producto', error: 401 }
    }
    if (!object.Origen || typeof object.Origen !== 'string') {
      return { message: 'Ingrese el Origen del producto', error: 401 }
    }

    const productos =await this.productoRP.find({ relations: ['Precios'] })
    const producto = await this.productoRP.findOne(id, { relations: ['Precios'] })
    const codigosBarras = (productos.map(producto => producto.CodigoBarra)).filter(codigo => codigo!==producto.CodigoBarra)

    // VERIFICACION DEL ID
    if(!producto) {
      return { message: 'Ingrese un ID valido', error: 401 }
    }
    // VERIFICACION DE QUE EL CODIGO DE BARRA SEA UNICO
    if(codigosBarras.includes(object.CodigoBarra)){
      return { message: 'Ingrese un codigo de barra unico', error: 401 }
    }

    // VERIFICACION DE LOS PRECIOS
    if(!object.Precios || !Array.isArray(object.Precios) || object.Precios.length !== 4){
      return { message: 'Listado de precios invalido', error: 401 }
    }
    const precios = (object.Precios).map(precio => verificarPrecio(precio))
    if(precios.includes(false)){
      return { message: 'Formato de los precios invalido', error: 401 }
    }

    // VERIFICACION DE QUE LAS CATEGORIAS Y EL ORIGEN SEA VALIDO
    if (!Origen.includes(object.Origen)) {
      return { message: 'Ingrese un origen del producto valido', error: 401 }
    }
    if(!Categorias.includes(object.Categoria)){
      return { message: 'Ingrese una categoria de producto valido', error: 401 }
    }

    // ELIMINACION DE LOS PRECIOS PREVIOS
    for (let index = 0; index < producto.Precios.length; index++) {
      await axios.delete('http://localhost:3001/Precios/'+producto.Precios[index].ID, { data: { 'token': object.token } })
    }

    const produtoAlterado: any = {
      CodigoBarra: object.CodigoBarra,
      Descripcion: object.Descripcion,
      FechaCreacion: producto.FechaCreacion,
      FechaModificacion: new Date(),
      Cantidad: producto.Cantidad,
      Categoria: object.Categoria,
      Origen: object.Origen
    }

    await this.productoRP.update(id, produtoAlterado)
    for (let index = 0; index < object.Precios.length; index++) {
      await axios.post('http://localhost:3001/Precios', { ...object.Precios[index], token:  object.token, Producto: id })
    }
    return await this.productoRP.findOne(id, { relations: ['Precios'] })
  }

  async findAll(token: any){
    if(validateToken(token,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    return  await this.productoRP.find({ relations: ['Precios'] })
  }

  async deleteProducto(token: any, id:number){
    if(validateToken(token,  ['Administrador']) === false) {
      return { message: 'token missing or invalid', error: 401 }
    }
    const producto = await this.productoRP.findOne(id, { relations: ['Precios'] })
    if(producto){
      for (let index = 0; index < producto.Precios.length; index++) {
        await axios.delete('http://localhost:3001/Precios/'+producto.Precios[index].ID, { data: { 'token': token } })
      }
      await this.productoRP.delete(id)
      return producto
    }
    return { Message: 'Ingrese un ID valido', error: 401 }
  }
}
