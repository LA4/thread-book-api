import { Body, Controller, Post } from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favorite')
export class FavoriteController {

    constructor(
        private readonly favorite: FavoriteService
    ) { }

    @Post()
    async addToFavorite(@Body() favoriteElements: { userId: string, bookId: string }) {
        await this.favorite.addFavoriteBook(favoriteElements)
    }
}
