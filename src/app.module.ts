import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { CategoryController } from './category/category.controller';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { CategoryService } from './category/category.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }), MongooseModule.forRoot(process.env.DATABASE),
    BooksModule,
    CategoryModule,
  ],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule {
}
