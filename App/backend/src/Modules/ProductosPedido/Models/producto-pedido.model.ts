
export default interface productoPedidoModel {
    ID: number,
    FechaCreacion: Date,
    CodigoBarra: string,
    Descripcion: string,
    Cantidad: number,
    Costo: number,
    Precio: number,
    Impuesto: number,
    Pedido: number,
    Producto: number
}