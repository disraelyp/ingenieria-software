export default interface PedidoModel {
    ID: number,
    FechaCreacion: Date,
    FechaModificacion: Date,
    Vendedor: string,
    Estado: string,
    Cliente: number,
    Pagado: boolean
}