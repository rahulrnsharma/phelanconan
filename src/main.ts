import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder().setTitle('phelanconan')
                       .setDescription('This is phelanconan form')
                       .setVersion('v1')
                       .addTag('Form')
                       .build();
  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('api',app,document);
  await app.listen(3000);
}
bootstrap();
