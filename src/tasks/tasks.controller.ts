import { Controller, Get, Param, Query, Body, Post, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { criarTaskDto } from './dto/criar-tasks.dto';
import { atualizarTaskDto } from './dto/atualizar-tasks.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) { }

    @Get("/listar")
    getListar() {
        return this.taskService.listarTasks()
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




