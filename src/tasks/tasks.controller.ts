import { Controller, Get, Param, Query, Body, Post, Patch, Delete, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { criarTaskDto } from './dto/criar-tasks.dto';
import { atualizarTaskDto } from './dto/atualizar-tasks.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';

@Controller('tasks')
@UseInterceptors(LoggingInterceptor)
export class TasksController {
    constructor(private readonly taskService: TasksService) { }

    @Get("/listar")
    getListar(@Query() pagination: PaginationDto) {
        return this.taskService.listarTasks(pagination)
    }

    @Get(":id")
    getBuscar(@Param("id",ParseIntPipe) id: number) {
        return this.taskService.buscarUnico(id)
    }

    @Post("/criar")
    criarTask(@Body() criarTaskDto: criarTaskDto) {
        return this.taskService.criarTask(criarTaskDto);

    }

    @Patch(":id")
    atualizarTasks(@Param("id",ParseIntPipe) id: number, @Body() atualizarTasksDto: atualizarTaskDto) {
    
        return this.taskService.atualizarTasks(id,atualizarTasksDto);

    }

    @Delete(":id") 

    excluirTask(@Param("id", ParseIntPipe) id: number){
        return this.taskService.exluir(id);
    }
}




