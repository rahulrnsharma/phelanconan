import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfigService {
    constructor(private configService: ConfigService) { }

    get jwtSecret(): string {
        return this.configService.get<string>('JWT_SECRET');
    }
    get adminExpireIn(): string {
        return this.configService.get<string>('ADMIN_JWT_EXPIRE_IN');
    }
    get userExpireIn(): string {
        return this.configService.get<string>('USER_JWT_EXPIRE_IN');
    }
}