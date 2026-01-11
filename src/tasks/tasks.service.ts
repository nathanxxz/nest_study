import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/tasks.entity';
import { criarTaskDto } from './dto/criar-tasks.dto';
import { atualizarTaskDto } from './dto/atualizar-tasks.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) { }

    async listarTasks() {
        const lista = await this.prisma.task.findMany();
        return lista;
    }
    async buscarUnico(id: number) {
        const task = await this.prisma.task.findFirst({
            where: {
                id: id
            }
        })

        if (task?.nome) {
            return task;
        }
        throw new HttpException("Essa tarefa nao existe", HttpStatus.NOT_FOUND)
        //throw new NotFoundException("Nao existe essa tarefa")
    }

    async criarTask(criarTaskDto: criarTaskDto) {
        const novaTask = await this.prisma.task.create({
            data: {
                nome: criarTaskDto.nome,
                descricao: criarTaskDto.descricao,
                completo: false

            }
        })

        return novaTask;
    }

    async atualizarTasks(id: number, atualizarTaskDto: atualizarTaskDto) {

        const index = await this.prisma.task.findFirst({
            where: {
                id: id
            }
        })

        if (!index) {
            throw new HttpException("Essa tarefa nao existe", HttpStatus.NOT_FOUND)
        }

        const atu = await this.prisma.task.update({
            where: {
                id: id
            },
            data: atualizarTaskDto
        })
        return atu;
    }

    async exluir(id: number) {
        try {
            const index = await this.prisma.task.findFirst({
                where: {
                    id: id
                }
            })
            if (index) {
                this.prisma.task.delete({
                    where: {
                        id: id
                    }
                })
            }

            else {
                throw new HttpException("Essa tarefa nao existe", HttpStatus.NOT_FOUND);
            }

            return {
                message: "tarefa excluida"
            }
        }

        catch (err) {
            throw new HttpException("Falha ao apagar", HttpStatus.BAD_REQUEST);
            console.log(err);
        }
    }

}
