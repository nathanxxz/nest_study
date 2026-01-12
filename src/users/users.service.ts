import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersService {

    constructor(private readonly prisma: PrismaService){}

    async buscar(id:number){
       const user= await this.prisma.user.findFirst({
        where:{
            id:id
        }
       });
       if(user){
        return user;
       }

       throw new HttpException("Erro ao encontrar usuario",HttpStatus.BAD_REQUEST)
    }
}
