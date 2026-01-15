import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { criarUserDto } from './dto/criar-user-dto';
import { atualizarUserDto } from './dto/atualizar-user-dto';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';

@Injectable()
export class UsersService {

    constructor(private readonly prisma: PrismaService,
        private readonly hashService: HashingServiceProtocol
    ){}

    async buscar(id:number){
       const user= await this.prisma.user.findFirst({
        where:{
            id:id
        },
        select:{
            id: true,
            email: true,
            nome: true,
            Task: true // Agora vai consxeguir trazer todas as tarefas ligadas a esse usuario
        }
       });
       if(user){
        return user;
       }

       throw new HttpException("Erro ao encontrar usuario",HttpStatus.BAD_REQUEST)
    }

    async criarUsuario(criarUserDto: criarUserDto){
        const senhaHash = await this.hashService.hash(criarUserDto.senha)
        const user= await this.prisma.user.create({
            data:{
                nome: criarUserDto.nome,
                email: criarUserDto.email,
                senha: senhaHash
            },
            select:{ //so devolve os parametros que eu deixar ai dentro
                id: true,
                nome: true,
                email: true
            }
        })
        return user;
    }
    
    async excluir(id: number){
        const user= await this.prisma.user.findFirst({
            where:{
                id:id
            }
        })
        if(user){
           await this.prisma.user.delete({
                where:{
                    id:id
                }
            })
            return {message:"Excluido com sucesso" };
        }

        throw new   HttpException("Erro ao excluir",HttpStatus.NOT_FOUND)
    }

    async atualizar(id: number, atualizarUserDto: atualizarUserDto){
        try{
            const atu= await this.prisma.user.findFirst({
                where:{
                    id:id,
                },
            })
              if (!atu) {
            throw new HttpException("Esse usuario nao existe", HttpStatus.NOT_FOUND)
        }

        const atua = await this.prisma.user.update({
            where: {
                id: id
            },
            data:{
                nome: atualizarUserDto.nome? atualizarUserDto.nome : atu.nome,
                email: atualizarUserDto.email? atualizarUserDto.email: atu.email,
                senha: atualizarUserDto.senha? atualizarUserDto.senha: atu.senha
            },
            select:{
                id: true,
                nome: true,
                email: true
            
            }
        })
        return atua;
        }
        catch{
            throw new HttpException("Erro",HttpStatus.NOT_FOUND)
        }
    }
}
