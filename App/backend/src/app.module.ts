import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { DatabaseModule } from './Modules/Database/database.module'
import { UsuariosModule } from './Modules/Usuarios/usuarios.module'

@Module({
  imports: [
    UsuariosModule, DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
