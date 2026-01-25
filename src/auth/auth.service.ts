import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/database/prisma.service';
import { HashingServiceProtocol } from './hash/hashing.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private readonly hashService: HashingServiceProtocol,

      @Inject(jwtConfig.KEY)
      private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
      private readonly jwtService: JwtService
    ){
      console.log(jwtConfiguration)
    }

    async autenticacao(loginDto: LoginDto){
      const user = await this.prisma.user.findFirst({
        where:{
            email:loginDto.email,
         //   status:true
        }
      })

      if(!user){
        throw new HttpException("Falha ao fazer login", HttpStatus.UNAUTHORIZED)
      }

      const senhaValida = await this.hashService.compare(loginDto.senha,user.senha)

      if(!senhaValida){
          throw new HttpException("Falha ao fazer login", HttpStatus.UNAUTHORIZED)
      }

      const token = await this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,

        },
        {
          secret: this.jwtConfiguration.secret,
          expiresIn: this.jwtConfiguration.jwtTtl,
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer
        }
      )

      return{
        id:user.id,
        nome:user.nome,
        email:user.email,
        token:token
      }
    }
}
