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
    get globalPaymentMerchantId(): string {
        return "dev564313104735132748";//this.configService.get<string>('GLOBAL_PAYMENT_MERCHANT_ID');
    }
    get globalPaymentSharedSecret(): string {
        return "i21IqO6D7Y";//this.configService.get<string>('GLOBAL_PAYMENT_SHARED_SECRET');
    }
    get globalPaymentApiUrl(): string {
        return "https://api.sandbox.globalpay-ecommerce.com";//this.configService.get<string>('GLOBAL_PAYMENT_API_URL');
    }
    get globalPaymentRealexApiUrl(): string {
        return "https://api.sandbox.realexpayments.com/epage-remote.cgi"//this.configService.get<string>('GLOBAL_PAYMENT_REALEX_API_URL');
    }
}