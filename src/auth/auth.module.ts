import { Global, Module } from '@nestjs/common';
import { HashingServiceProtocol } from './hash/hashing.service';
import { BcryptService } from './hash/bcrypt.service';

@Global() // pode ser usada na aplicacao inteira, nao precisa importar em outros lugares, apenas no app module
@Module({
    providers:[
        {
            provide: HashingServiceProtocol,
            useClass: BcryptService
        }
    ],
    exports:[
        HashingServiceProtocol
    ]
})
export class AuthModule {}
