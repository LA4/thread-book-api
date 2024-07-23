import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from 'src/books/schema/books.schema';
import { User, UserSchema } from 'src/user/schema/user.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

  ],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {}
