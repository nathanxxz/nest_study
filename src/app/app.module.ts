import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from 'src/tasks/tasks.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TasksModule, UsersModule], //Sempre importar os modulos querem
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
