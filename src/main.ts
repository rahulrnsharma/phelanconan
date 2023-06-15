import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/http-exception.filter';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  const config = new DocumentBuilder()
    .setTitle('Phelanconan')
    .setDescription('The Phelanconan API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(helmet({ crossOriginResourcePolicy: false }));
  const httpAdapter = app.get(HttpAdapterHost, { strict: true });
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    enableDebugMessages: true,
    stopAtFirstError: true,
    forbidUnknownValues: false,
    exceptionFactory: (error: ValidationError[]) => {
      const _error = error[0];
      return new BadRequestException(Object.values(_error?.constraints)[0]);
    }
  }));
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
