import { Controller, Get, Param, Query, Body, Post, Patch, Delete, ParseIntPipe, UseInterceptors, UseGuards, Injectable, Inject } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { criarTaskDto } from './dto/criar-tasks.dto';
import { atualizarTaskDto } from './dto/atualizar-tasks.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { AuthAdminGuard } from 'src/common/guards/admin-guard';
import { TokenPayLoadParam } from 'src/auth/param/token-payload.param';
import { PayLoadTokenDto } from 'src/auth/dto/payload.dto';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';

@Controller('tasks')
//@UseInterceptors(LoggingInterceptor)
export class TasksController {
    constructor(private readonly taskService: TasksService,

        //   @Inject("KEY_TOKEN") //usado para injetar e usar o valor de algo
        //     private readonly keyToken: string
    ) { }



    @Get("/listar")
    //   @UseGuards(AuthAdminGuard) // guard apenas aqui, mas posso por no controller inteiro se quiser
    getListar(@Query() pagination: PaginationDto) {
        //   console.log(this.keyToken)
        return this.taskService.listarTasks(pagination)

    }

    @Get(":id")
    getBuscar(@Param("id", ParseIntPipe) id: number) {
        return this.taskService.buscarUnico(id)
    }

    @UseGuards(AuthTokenGuard)
    @Post("/criar")
    criarTask(@Body() criarTaskDto: criarTaskDto, @TokenPayLoadParam() tokenPay: PayLoadTokenDto) {
        return this.taskService.criarTask(criarTaskDto, tokenPay);

    }
    @UseGuards(AuthAdminGuard)
    @Patch(":id")
    atualizarTasks(@Param("id", ParseIntPipe) id: number, @Body() atualizarTasksDto: atualizarTaskDto,  @TokenPayLoadParam() token : PayLoadTokenDto) {

        return this.taskService.atualizarTasks(id, atualizarTasksDto, token);

    }

    @UseGuards(AuthAdminGuard)
    @Delete(":id")

    excluirTask(@Param("id", ParseIntPipe) id: number, @TokenPayLoadParam() token : PayLoadTokenDto) {
        return this.taskService.exluir(id, token);
    }
}




