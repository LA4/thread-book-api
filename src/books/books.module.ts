import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schema/books.schema';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { CategoryService } from 'src/category/category.service';
import { Category, CategorySchema } from 'src/category/schema/category.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]), MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])
  ],
  controllers: [BooksController],
  providers: [BooksService, CategoryService],

})
export class BooksModule { }