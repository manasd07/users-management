import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BackendConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const APP_NAME = process.env.APP_NAME;
  const APP_VERSION = process.env.APP_VERSION;
  
  const backendConfigService = app.get(BackendConfigService);
  await app.listen(backendConfigService.port);
}
bootstrap();
