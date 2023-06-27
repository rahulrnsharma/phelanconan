import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiExcludeEndpoint } from "@nestjs/swagger";
import { CardDetailDto, PaymentAuthenticationDto, PaymentAuthorizationDto } from "src/dto/payment.dto";
import { PaymentService } from "src/service/payment.service";


@Controller('payment')
export class PaymentController {
    constructor(private readonly PaymentService: PaymentService) { }
    @ApiExcludeEndpoint()
    @Post('protocol-version')
    protocolVersion(@Body() cardDetailDto: CardDetailDto) {
        return this.PaymentService.protocolVersion(cardDetailDto);
    }
    @ApiExcludeEndpoint()
    @Post('authentication')
    authentication(@Body() data: PaymentAuthenticationDto) {
        return this.PaymentService.initiatAuthenticate(data);
    }
    @ApiExcludeEndpoint()
    @Post('authorization')
    authorization(@Body() data: PaymentAuthorizationDto) {
        return this.PaymentService.authorization(data);
    }
    @ApiExcludeEndpoint()
    @Post('notification')
    notification(@Body() data: any) {
        const plain = Buffer.from(data.threeDSMethodData, 'base64').toString('utf8');
        return `<script>
        window.parent.postMessage({ data: { type: "notification", plain: ${plain} }},"*");
    </script>`
    }
    @ApiExcludeEndpoint()
    @Post('challenge')
    challenge(@Body() data: any) {
        const plain = Buffer.from(data.cres, 'base64').toString('utf8');
        return `<script>
        window.parent.postMessage({ data: { type: "challenge", plain: ${plain} }}, "*");
    </script>`
    }
    @ApiExcludeEndpoint()
    @Get('authentication/:server_trans_id')
    getAuthentication(@Param('server_trans_id') server_trans_id: string) {
        return this.PaymentService.getAuthentication(server_trans_id);
    }
    @ApiExcludeEndpoint()
    @Put('failed/:orderId/:transectionId')
    failed(@Param('orderId') orderId: string, @Param('transectionId') transectionId: string, @Body() data: any) {
        return this.PaymentService.failed(orderId, transectionId, data);
    }
}