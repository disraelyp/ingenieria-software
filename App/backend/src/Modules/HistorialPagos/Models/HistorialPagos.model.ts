
export default interface HistorialPagosModel {
    ID: number
    Fecha: Date
    Descripcion: string
    Termino: number
    PagoMinimo: number
    SaldoPendiente: number
    Vendedor: string
    SaldoPagado: number
}