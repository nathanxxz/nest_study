import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/database/prisma.service';
import { HashingServiceProtocol } from './hash/hashing.service';

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private readonly hashService: HashingServiceProtocol){}

    async autenticacao(loginDto: LoginDto){
      const user = await this.prisma.user.findFirst({
        where:{
            email:loginDto.email
        }
      })

      if(!user){
        throw new HttpException("Falha ao fazer login", HttpStatus.UNAUTHORIZED)
      }

      const senhaValida = await this.hashService.compare(loginDto.senha,user.senha)

      if(!senhaValida){
          throw new HttpException("Falha ao fazer login", HttpStatus.UNAUTHORIZED)
      }

      return{
        id:user.id,
        nome:user.nome,
        email:user.email,
      }
    }
}
