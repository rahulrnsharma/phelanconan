import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger";
import { AdminDto } from "src/dto/admin.dto";

import { AdminService } from "src/service/admin.service";
import { JwtAuthGuard } from "src/service/guard/jwt-auth.guard";


@ApiTags('admin')
@Controller('admin')
export class AdminController{
    constructor(private adminService:AdminService){}

    @ApiExcludeEndpoint()
    @Post('')
    create(@Body() adminDto:AdminDto){
        return this.adminService.create(adminDto)
    }

    @Get('')
    hello(){
        
    }
 
}


