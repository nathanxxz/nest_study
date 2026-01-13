
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
  //  console.log('Middleware PASSANDO...');
  const authorization = req.headers.authorization

  if(authorization){
    console.log("Token", authorization); //aqui é utilizado para validar token de usuario
  }
    next();
  }
}
