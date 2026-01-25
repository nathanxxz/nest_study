import { Global, Module } from '@nestjs/common';
import { HashingServiceProtocol } from './hash/hashing.service';
import { BcryptService } from './hash/bcrypt.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Global() // pode ser usada na aplicacao inteira, nao precisa importar em outros lugares, apenas no app module
@Module({
    imports:[ConfigModule.forFeature(jwtConfig),
        JwtModule.registerAsync(jwtConfig.asProvider())
    ],
    providers:[ PrismaService,
        {
            provide: HashingServiceProtocol,
            useClass: BcryptService
        },
        AuthService
    ],
    exports:[
        HashingServiceProtocol, JwtModule, ConfigModule
    ],
    controllers: [AuthController]
})
export class AuthModule {}
