import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schema/books.schema';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { CategoryService } from 'src/category/category.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])
  ],
  controllers: [BooksController],
  providers: [BooksService, CategoryService],

})
export class BooksModule { }