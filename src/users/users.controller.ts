import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { UsersService } from './users.service';
import { criarUserDto } from './dto/criar-user-dto';
import { atualizarUserDto } from './dto/atualizar-user-dto';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { TokenPayLoadParam } from 'src/auth/param/token-payload.param';
import { PayLoadTokenDto } from 'src/auth/dto/payload.dto';

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
    excluirUsuario(@Param("id", ParseIntPipe) id:number, @TokenPayLoadParam() tokenPay: PayLoadTokenDto){
        return this.userService.excluir(id, tokenPay);
    }

    @UseGuards(AuthTokenGuard)
    @Patch(":id")
    atualizarUsuario(@Param("id", ParseIntPipe)id:number, @Body() atualizarUserDto: atualizarUserDto, @TokenPayLoadParam() tokenPay : PayLoadTokenDto){
        
      
        return this.userService.atualizar(id,atualizarUserDto,tokenPay);
    }
}
