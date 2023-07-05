import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { IUser } from 'src/interface/user.interface';
import { RoleEnum } from 'src/enum/common.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: IUser) {
        let _detail: any = await this.authService.getLoggedInDetail(payload.userId);
        if (_detail) {//?._id == payload.loggedInId
            if (payload.role == RoleEnum.STAFF) {
                let _userDetail: any = await this.authService.userDetail(payload);
                payload.institute = _userDetail.profile.institute;
            }
            return payload;
        }
        else
            throw new UnauthorizedException('You are unauthrized')
    }
}