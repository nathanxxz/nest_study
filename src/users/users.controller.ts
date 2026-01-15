import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post, UseInterceptors } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { UsersService } from './users.service';
import { criarUserDto } from './dto/criar-user-dto';
import { atualizarUserDto } from './dto/atualizar-user-dto';

@Controller('users')
@UseInterceptors(LoggingInterceptor)
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Get(":id")
    buscarUsuario(@Param("id", ParseIntPipe) id: number) {
        console.log("Token teste:",process.env.TOKEN_KEY) //Utilizado para testar o config module
        return this.userService.buscar(id);
    }

    @Post("/criar")
    criarUsuario(@Body() criarUsuarioDto: criarUserDto){
        return this.userService.criarUsuario(criarUsuarioDto);
    }

    @Delete(":id")
    excluirUsuario(@Param("id", ParseIntPipe) id:number){
        return this.userService.excluir(id);
    }

    @Patch(":id")
    atualizarUsuario(@Param("id", ParseIntPipe)id:number, @Body() atualizarUserDto: atualizarUserDto){
        return this.userService.atualizar(id,atualizarUserDto);
    }
}
