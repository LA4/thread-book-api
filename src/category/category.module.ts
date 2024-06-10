import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schema/category.schema';
import { BooksService } from 'src/books/books.service';
import { BooksController } from 'src/books/books.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule { }
