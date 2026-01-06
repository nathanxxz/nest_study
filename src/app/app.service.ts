import { Injectable } from '@nestjs/common';

// Service fica responsavel pela logica de negocio
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
