import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/decorator/current-user.decorator";
import { AdminLoginDto } from "src/dto/auth.dto";
import { IAdmin } from "src/interface/admin.interface";
import { AuthService } from "src/service/auth.service";
import { JwtAuthGuard } from "src/service/guard/jwt-auth.guard";
import { LocalAuthGuard } from "src/service/guard/local-auth.guard";


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    adminLogin(@Body() adminloginDto: AdminLoginDto, @CurrentUser() user: IAdmin) {
        return this.authService.login(user)
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('logout')
    logout(@CurrentUser() user: IAdmin) {
        return this.authService.logout(user)
    }
}