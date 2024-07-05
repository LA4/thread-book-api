import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BooksService } from 'src/books/books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from 'src/books/schema/books.schema';
import { User, UserSchema } from './schema/user.schema';
import { Category, CategorySchema } from 'src/category/schema/category.schema';
import { Author, AuthorSchema } from 'src/author/schema/author.schema';
import { Publisher, PublisherSchema } from 'src/publisher/schema/publisher.schema';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
    MongooseModule.forFeature([{ name: Publisher.name, schema: PublisherSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, BooksService, AuthService, JwtService],
  exports: [UserService]

})
export class UserModule { }
