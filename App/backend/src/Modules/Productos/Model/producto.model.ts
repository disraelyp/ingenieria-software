export interface ProductoModel {
    ID: number,
    CodigoBarra: string,
    Descripcion: string,
    Cantidad: number,
    FechaCreacion: Date,
    FechaModificacion: Date,
    Categoria: string,
    Activo: boolean,
    Origen: string
}