import { Controller, Body, Post } from '@nestjs/common'
import { DevolucionService } from '../Services/devolucion.service'


@Controller('DevolucionEstado')
export class DevolucionEstadoController {
  constructor(private devolucionService: DevolucionService) {}


  @Post()
  updateDevolucion(@Body() devolucionModel: any): any {
    return this.devolucionService.cambiarEstado(devolucionModel)
  }
}
