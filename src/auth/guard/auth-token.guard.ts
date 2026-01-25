import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { Inject } from "@nestjs/common";
import jwtConfig from "../config/jwt.config";
import { ConfigType } from "@nestjs/config";
import { REQUEST_TOKEN_PAYLOAD } from "../common/auth.constants";
import { PrismaService } from "src/database/prisma.service";

export class AuthTokenGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    ) {
        console.log(jwtConfiguration)
    }


    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token = this.tokenHeader(request);

        if (!token) {
            throw new UnauthorizedException("Token nao autorizado")
        }
        try {
            const paylod = await this.jwtService.verifyAsync(token, this.jwtConfiguration)

            request[REQUEST_TOKEN_PAYLOAD] = paylod

            const userStatus = await this.prisma.user.findFirst({
                where: {
                    id: paylod?.sub
                }
            })
         //   if (!userStatus.status) {
       //         throw new UnauthorizedException("Acesso nao autorizado")
       //     }
        }
        catch (err) {
            console.log(err);
            throw new UnauthorizedException("Acesso nao autorizado")
        }
        return true;
    }

    tokenHeader(request: Request): string {
        const authorization = request.headers?.authorization;

        if (!authorization || typeof authorization !== "string") {
            throw new UnauthorizedException('Token não fornecido');
        }

        return authorization.split(" ")[1];
    }
}