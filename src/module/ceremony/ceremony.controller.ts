import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/decorator/current-user.decorator";
import { CeremonyDto } from "src/dto/ceremony.dto";
import { IAdmin } from "src/interface/admin.interface";
import { CeremonyService } from "src/service/ceremony.service";
import { JwtAuthGuard } from "src/service/guard/jwt-auth.guard";

@ApiTags('Ceremony')
@Controller('ceremony')
export class CeremonyController {
    constructor(private ceremonyService: CeremonyService) { }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('')
    add(@Body() ceremonyDto: CeremonyDto, @CurrentUser() user: IAdmin) {
        return this.ceremonyService.add(ceremonyDto, user);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('')
    getAll() {
        return this.ceremonyService.getAll()
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiParam({ name: 'id' })
    getById(@Param('id') id: string) {
        return this.ceremonyService.getById(id);
    }
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiParam({ name: 'id' })
    update(@Body() ceremonyDto: CeremonyDto, @Param('id') id: string, @CurrentUser() user: IAdmin) {
        return this.ceremonyService.update(ceremonyDto, id, user)
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiParam({ name: 'id' })
    delete(@Param('id') id: string, @CurrentUser() user: IAdmin) {
        return this.ceremonyService.delete(id, user)
    }
}