import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(
        private readonly searchService : SearchService
    ){}
    @Get("/:userId")
    async searchBook(@Param("userId")userId : string, @Query() query: {q: string}){
        
      return await this.searchService.searchBook(userId,query.q)
    }
}
