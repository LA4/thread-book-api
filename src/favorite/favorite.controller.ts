import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favorite')
export class FavoriteController {

    constructor(
        private readonly favorite: FavoriteService
    ) { }

    @Post()
    async addToFavorite(@Body() favoriteElements: { userId: string, bookId: string }) {
        return await this.favorite.addFavoriteBook(favoriteElements)
    }
    @Post("/get")
    async getFavotites(@Body() userId) {
        return await this.favorite.getFavotites(userId.user)
    }
}
