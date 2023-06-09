import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { MongoErrorCodeEnum } from 'src/enum/mongo-error.enum';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    catch(exception: any, host: ArgumentsHost): void {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const { httpAdapter } = this.httpAdapterHost;
        // console.log(exception)
        const ctx = host.switchToHttp();
        let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: any;
        if (exception instanceof HttpException) {
            httpStatus = exception.getStatus();
            const response: any = exception?.getResponse();
            message = response.message;
        }
        else {
            httpStatus = HttpStatus.BAD_REQUEST;
            switch (exception.code) {
                case MongoErrorCodeEnum.DuplicateKey: {
                    message = "You are trying to add duplicate records.";
                    break;
                }
                default: {
                    message = exception instanceof Error ? exception.message : exception?.message?.error;
                }
            }
        }

        // const httpStatus =
        //     exception instanceof HttpException
        //         ? exception.getStatus()
        //         : HttpStatus.INTERNAL_SERVER_ERROR;
        // if (exception instanceof HttpException) {
        //     const response: any = exception?.getResponse();
        //     message = response.message;
        // } else {
        //     message = exception instanceof Error ? exception.message : exception?.message?.error;
        // }
        /* const message = exception instanceof Error ? exception.message : exception?.message?.error; */
        const responseBody = {
            statusCode: httpStatus,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
            message: message || 'Sorry we are experiencing some technical problems.',
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}