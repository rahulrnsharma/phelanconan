import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CardDetailDto, PaymentAuthenticationDto, PaymentAuthorizationDto } from "src/dto/payment.dto";
import { PaymentService } from "src/service/payment.service";


@Controller('payment')
export class PaymentController {
    constructor(private readonly PaymentService: PaymentService) { }

    @Post('protocol-version')
    protocolVersion(@Body() cardDetailDto: CardDetailDto) {
        return this.PaymentService.protocolVersion(cardDetailDto);
    }

    @Post('authentication')
    authentication(@Body() data: PaymentAuthenticationDto) {
        return this.PaymentService.initiatAuthenticate(data);
    }

    @Post('authorization')
    authorization(@Body() data: PaymentAuthorizationDto) {
        return this.PaymentService.authorization(data);
    }

    @Post('notification')
    notification(@Body() data: any) {
        return { success: true };
    }
    @Post('challenge')
    challenge(@Body() data: any) {
        return { success: true };
    }

    @Get('authentication/:server_trans_id')
    getAuthentication(@Param('server_trans_id') server_trans_id: string) {
        return this.PaymentService.getAuthentication(server_trans_id);
    }
}