import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schema/category.schema';
import { CategoryDTO } from './category.dto';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDTO>) { }


    async createCategory() {
        return "this is a new category tho"
    }
    async getCategory() {
        return "hey tgjiq is your choosed category"
    }
    async getAllCategories() {


        return "This are all categories"
    }
}
