import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schema/category.schema';
import { BooksService } from 'src/books/books.service';
import { BooksController } from 'src/books/books.controller';
import { Book, BookSchema } from 'src/books/schema/books.schema';
import { Author, AuthorSchema } from 'src/author/schema/author.schema';
import { User, UserSchema } from 'src/user/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [CategoryController,],
  providers: [CategoryService, BooksService],
})
export class CategoryModule { }
