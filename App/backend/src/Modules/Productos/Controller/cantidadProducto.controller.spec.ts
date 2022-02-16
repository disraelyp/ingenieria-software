import { Test, TestingModule } from '@nestjs/testing'
import { CantidadProductoController } from '../Controller/cantidadProducto.controller'

describe('CantidadProductoController', () => {
  let controller: CantidadProductoController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CantidadProductoController],
    }).compile()

    controller = module.get<CantidadProductoController>(CantidadProductoController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})