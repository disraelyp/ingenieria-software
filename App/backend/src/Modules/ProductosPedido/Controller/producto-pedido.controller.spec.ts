import { Test, TestingModule } from '@nestjs/testing'
import { ProductoPedidoController } from './producto-pedido.controller'


describe('ProductoPedidoController', () => {
  let controller: ProductoPedidoController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductoPedidoController],
    }).compile()

    controller = module.get<ProductoPedidoController>(ProductoPedidoController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})