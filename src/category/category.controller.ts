import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
