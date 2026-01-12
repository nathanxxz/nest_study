import { Body, Controller, Param, ParseIntPipe, Post, UseInterceptors } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { UsersService } from './users.service';
import { criarUserDto } from './dto/criar-user-dto';

@Controller('users')
@UseInterceptors(LoggingInterceptor)
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Get(":id")
    buscarUsuario(@Param("id", ParseIntPipe) id: number) {
        return this.userService.buscar(id);
    }

    @Post("/criar")
    criarUsuario(@Body() criarUsuarioDto: criarUserDto){
        return "ok"
        console.log(criarUsuarioDto);
    }
}
