import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schema/category.schema';
import { CategoryDTO } from './category.dto';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDTO>) { }


    async createCategory(category: CategoryDTO) {
        const existingCategory = await this.categoryModel.findOne({ name: category.name })
        console.log(existingCategory)
        if (!existingCategory) {
            throw new ConflictException('This category was already register')
        }

        const newCategory = new this.categoryModel(category)


        return newCategory.save()
    }

    async getCategory() {
        return "hey tgjiq is your choosed category"
    }

    async getAllCategories() {

        const AllCategories = await this.categoryModel.find().exec()
        if (!AllCategories) {
            throw new NotFoundException("No category found")
        }
        if (AllCategories.length === 0) {
            return "No category yet"
        }
        return AllCategories
    }
}
