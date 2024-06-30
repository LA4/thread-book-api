import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO } from './category.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly CategoryService: CategoryService) { }

    @Post('/new')
    createCategory(@Body() category: CategoryDTO) {
        console.log(category)
        return this.CategoryService.createCategory(category)
    }

    @Get()
    getAllCategories() {
        return this.CategoryService.getAllCategories()
    }

    @Get("/:name")
    getBookByCategory(@Param('name') name: string) {
        console.log(name)

        return this.CategoryService.getBookByCategory(name)
    }

}
