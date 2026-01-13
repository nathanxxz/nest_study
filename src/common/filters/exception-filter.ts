import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response, Request } from "express";



@Catch(HttpException)
export class ApiExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const status = exception.getStatus();
        const error = exception.getResponse();


        response.status(status).json({
            statusC: status,
            timestamp: new Date().toISOString(),
            message: error !== "" ? error : "Erro ao realizar operacao",
            path: request.url
        })

     
        
    }

}