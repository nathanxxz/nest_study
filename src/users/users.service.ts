import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { criarUserDto } from './dto/criar-user-dto';
import { atualizarUserDto } from './dto/atualizar-user-dto';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';
import { PayLoadTokenDto } from 'src/auth/dto/payload.dto';

@Injectable()
export class UsersService {

    constructor(private readonly prisma: PrismaService,
        private readonly hashService: HashingServiceProtocol
    ) { }

    async buscar(id: number) {
        const user = await this.prisma.user.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                email: true,
                nome: true,
                Task: true // Agora vai consxeguir trazer todas as tarefas ligadas a esse usuario
            }
        });
        if (user) {
            return user;
        }

        throw new HttpException("Erro ao encontrar usuario", HttpStatus.BAD_REQUEST)
    }

    async criarUsuario(criarUserDto: criarUserDto) {
        const senhaHash = await this.hashService.hash(criarUserDto.senha)
        const user = await this.prisma.user.create({
            data: {
                nome: criarUserDto.nome,
                email: criarUserDto.email,
                senha: senhaHash
            },
            select: { //so devolve os parametros que eu deixar ai dentro
                id: true,
                nome: true,
                email: true
            }
        })
        return user;
    }

    async excluir(id: number, tokenPay: PayLoadTokenDto) {
        const user = await this.prisma.user.findFirst({
            where: {
                id: id
            }
        })
     //   if (user.id !== tokenPay.sub) {

    //        throw new HttpException("Acesso negado", HttpStatus.BAD_REQUEST)
  //      }
        if (user) {
            await this.prisma.user.delete({
                where: {
                    id: id
                }
            })
            return { message: "Excluido com sucesso" };
        }

        throw new HttpException("Erro ao excluir", HttpStatus.NOT_FOUND)
    }

    async atualizar(id: number, atualizarUserDto: atualizarUserDto, tokenPay: PayLoadTokenDto) {

        try {
            const atu = await this.prisma.user.findFirst({
                where: {
                    id: id,
                },
            })
            if (!atu) {
                throw new HttpException("Esse usuario nao existe", HttpStatus.NOT_FOUND)
            }
            if (atu.id !== tokenPay.sub) {
                throw new HttpException("Acesso negado", HttpStatus.NOT_FOUND)
            }

            const data: { nome?: string, senha?: string } = {
                nome: atualizarUserDto.nome ? atualizarUserDto.nome : atu.nome,
            }

            if (atualizarUserDto?.senha) {
                const senhaHash = await this.hashService.hash(atualizarUserDto?.senha)
                data['senha'] = senhaHash
            }

            const atua = await this.prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    nome: data.nome,
                    senha: data?.senha ? data?.senha : atu.senha
                },
                select: {
                    id: true,
                    nome: true,
                    email: true

                }
            })
            return atua;
        }
        catch {
            throw new HttpException("Erro", HttpStatus.NOT_FOUND)
        }
    }
}
