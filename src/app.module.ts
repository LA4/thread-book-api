import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [BooksModule, ConfigModule.forRoot({
    envFilePath: ['.env'],
  }), MongooseModule.forRoot(process.env.DATABASE)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
