import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express'
import { join } from 'path';
import * as cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.useGlobalPipes(new ValidationPipe());
  // app.enableCors({origin :"https://tread-book-front-web.vercel.app"})
  app.use(cors({
    origin:   
 'https://tread-book-front-web.vercel.app',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  // Start the application
  await app.listen(process.env.PORT || 3000);
  // await app.listen(3000);
}
bootstrap();
