import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [],
  controllers: [UsersController], //Pra usar o prisma tem que importar o servico dele
  providers: [UsersService,PrismaService]
})
export class UsersModule {}
