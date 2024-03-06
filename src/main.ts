import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { WebSocket } from 'ws';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  // const ws = await new WebSocket.Server({
  //   port: 8060,
  //   // 'ws' specific configurations
  //   clientTracking: true, // Track clients
  //   maxPayload: 1024, // Maximum message size (in bytes)
  // });
}
bootstrap();
