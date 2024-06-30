import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { AuthorModule } from './author/author.module';
import { UserModule } from './user/user.module';
import { PublisherModule } from './publisher/publisher.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }), MongooseModule.forRoot(process.env.DATABASE),
    BooksModule,
    CategoryModule,
    AuthorModule,
    UserModule,
    PublisherModule,
  ],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule {
}
