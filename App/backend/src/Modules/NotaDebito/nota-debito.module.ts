import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NotaDebitoController } from './Controller/nota-debito.controller'
import { NotaDebitoEntity } from './Entity/nota-debito.entity'
import { notaDebitoService } from './Services/nota-debito.service'

@Module({
  imports:[
    TypeOrmModule.forFeature([NotaDebitoEntity])
  ],
  controllers: [
    NotaDebitoController
  ],
  providers:[
    notaDebitoService
  ]
})
export class NotaDebitoModule {}