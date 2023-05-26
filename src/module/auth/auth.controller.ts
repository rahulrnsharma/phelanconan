import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/decorator/current-user.decorator";
import { AdminLoginDto } from "src/dto/auth.dto";
import { IAdmin } from "src/interface/admin.interface";
import { AuthService } from "src/service/auth.service";
import { JwtAuthGuard } from "src/service/guard/jwt-auth.guard";


@ApiTags('auth')
@Controller()
export class AuthController{
    constructor(private authService:AuthService){}

@Post('login')
adminLogin(@Body() adminloginDto:AdminLoginDto){
    return this.authService.login(adminloginDto)
}

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Get('logout')
logout(@CurrentUser() user:IAdmin){
    return this.authService.logout(user)
}

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Post('/addEvent')
addEvent(@Body() eventDto){
    
}

}