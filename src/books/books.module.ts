import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schema/books.schema';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { CategoryService } from 'src/category/category.service';
import { Category, CategorySchema } from 'src/category/schema/category.schema';
import { Author, AuthorSchema } from 'src/author/schema/author.schema';
import { AuthorService } from 'src/author/author.service';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
import { Publisher, PublisherSchema } from 'src/publisher/schema/publisher.schema';
import { PublisherService } from 'src/publisher/publisher.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UserController } from 'src/user/user.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
    MongooseModule.forFeature([{ name: Publisher.name, schema: PublisherSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule
  ],
  controllers: [BooksController, UserController],
  providers: [BooksService, CategoryService, AuthorService, PublisherService, UserService, JwtService],

})
export class BooksModule { }