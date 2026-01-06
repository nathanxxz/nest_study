import { Controller, Delete, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

//Recebe              os endepoints
//ele chama o servico

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/teste")
  getTest() {
    return "é oo teste pai"
  }
  
  @Post("/teste2")
    postTest(){
      return "testei ne pai"
    }

  @Delete("/delete")
    deleteTest(){
      return "Deletei pai"
    }
}
