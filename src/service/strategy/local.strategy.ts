import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(username: any, password: any): Promise<any> {
        console.log("Hello Local")
        const user = await this.authService.validateAdminUser({ username: username, password: password });
        if (!user) {
            throw new BadRequestException("Invalid credential.");
        }
        return user;
    }
}