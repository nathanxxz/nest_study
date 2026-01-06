import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

//app modulo: principal do app, app controller: Define as rotas e requisicoes, app service: contem a logica de negocio, separado do controller
//Arquivo que inicia nosso projeto
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new  ValidationPipe({
    whitelist: true, //remove as chaves que nao estao no DTO (algo que nao existe nas rotas)
    transform: false, 
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
