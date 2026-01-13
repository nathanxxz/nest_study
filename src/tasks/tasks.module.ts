import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaService } from 'src/database/prisma.service';
import { APP_FILTER } from '@nestjs/core';
import { ApiExceptionFilter } from 'src/common/filters/exception-filter';



@Module({
  imports: [],
  controllers: [TasksController],
  providers: [TasksService, PrismaService,
    {
      provide: APP_FILTER,
      useClass: ApiExceptionFilter
    }
   ]
})
export class TasksModule {

}
