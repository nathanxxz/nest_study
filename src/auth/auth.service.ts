import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/database/prisma.service';
import { HashingServiceProtocol } from './hash/hashing.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';


@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private readonly hashService: HashingServiceProtocol,

      @Inject(jwtConfig.KEY)
      private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
    ){
      console.log(jwtConfiguration)
    }

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
