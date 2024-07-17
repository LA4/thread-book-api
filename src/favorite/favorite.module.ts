import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { Book, BookSchema } from 'src/books/schema/books.schema';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { FavariteSchema, Favorite } from './schema/favorite.schema';
import { Category, CategorySchema } from 'src/category/schema/category.schema';
import { Author, AuthorSchema } from 'src/author/schema/author.schema';
import { Publisher, PublisherSchema } from 'src/publisher/schema/publisher.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Favorite.name, schema: FavariteSchema }]),
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
    MongooseModule.forFeature([{ name: Publisher.name, schema: PublisherSchema }]),

  ],
  controllers: [FavoriteController],
  providers: [FavoriteService]
})
export class FavoriteModule { }
