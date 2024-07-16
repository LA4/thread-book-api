import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { Book, BookSchema } from 'src/books/schema/books.schema';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { FavariteSchema, Favorite } from './schema/favorite.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Favorite.name, schema: FavariteSchema }]),

  ],
  controllers: [FavoriteController],
  providers: [FavoriteService]
})
export class FavoriteModule { }
