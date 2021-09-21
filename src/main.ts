import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { BackendConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const APP_NAME = process.env.APP_NAME;
  const APP_VERSION = process.env.APP_VERSION;

  const options = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(`${APP_NAME} API description`)
    .setVersion(APP_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  const backendConfigService = app.get(BackendConfigService);
  SwaggerModule.setup('swagger', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(backendConfigService.port);
}
bootstrap();
