import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function start() {
  const PORT = process.env.PORT || 7000;
  const app = await NestFactory.create(AppModule);

  app.enableCors({ credentials: true, origin: 'http://localhost:8000' });
  app.use(cookieParser());

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start();
