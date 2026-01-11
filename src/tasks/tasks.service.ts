import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/tasks.entity';
import { NotFoundError } from 'rxjs';
import { criarTaskDto } from './dto/criar-tasks.dto';
import { atualizarTaskDto } from './dto/atualizar-tasks.dto';
import { PrismaService } from 'src/database/prisma.service';



@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService){}

    private tasks: Task[] = [
        {
            id: 1,
            nome: "batman",
            descricao: "o mior heroi do mundo",
            completo: true,
        }
    ]

    listarTasks(){
        return this.prisma.task.findMany();
    }
     buscarUnico(id:number){
       const task = this.tasks.find(task=> task.id===Number(id));

       if(task){
        return task;
       }
       throw new HttpException("Essa tarefa nao existe",HttpStatus.NOT_FOUND)
     //throw new NotFoundException("Nao existe essa tarefa")
     }

     criarTask(criarTaskDto: criarTaskDto){
        const novoId = this.tasks.length + 1;

        const novaTaks = {
            id: novoId,
            ...criarTaskDto,
            completo: false
        }
        this.tasks.push(novaTaks);
        return novaTaks;
     }

     atualizarTasks(id: number, atualizarTaskDto: atualizarTaskDto){

        const index = this.tasks.findIndex(task => task.id === Number(id))
        if(index >=0){
            const item = this.tasks[index]

            this.tasks[index] = {
                ...item,
                ...atualizarTaskDto,
            }
        }
        return "Tasks atualizada"
     }

     exluir(id : number){
          const index = this.tasks.findIndex(task => task.id === Number(id))
          if(index<0){
             throw new HttpException("Essa tarefa nao existe",HttpStatus.NOT_FOUND)
          }
          this.tasks.splice(index,1)
          return{
            message: "tarefa excluida"
          }
     }
    
}
