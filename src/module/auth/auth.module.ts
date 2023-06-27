import { Module } from "@nestjs/common";
import { AuthService } from "src/service/auth.service";
import { AuthController } from "./auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { LOGIN_SCHEMA, USER_SCHEMA } from "src/Schema";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AppConfigService } from "src/service/config.service";
import { JwtStrategy } from "src/service/strategy/jwt.strategy";
import { LocalStrategy } from "src/service/strategy/local.strategy";

@Module({
    imports: [JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get('JWT_SECRET')
        }),
        inject: [ConfigService]
    }), MongooseModule.forFeature([LOGIN_SCHEMA, USER_SCHEMA])],
    controllers: [AuthController],
    providers: [AuthService, AppConfigService, JwtStrategy, LocalStrategy],
    exports: []
})

export class AppAuthModule { }