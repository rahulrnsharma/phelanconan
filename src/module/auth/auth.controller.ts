import { Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "src/service/auth.service";


@ApiTags('auth')
@Controller()
export class AuthController{
    constructor(private authService:AuthService){}

// @Post('login')
// adminLogin(@Body() )
}