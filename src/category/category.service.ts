import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schema/category.schema';
import { CategoryDTO } from './category.dto';
import { Model } from 'mongoose';
import { Book } from 'src/books/schema/books.schema';
import { BookDTO } from 'src/books/book.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<CategoryDTO>,
        @InjectModel(Book.name) private bookModel: Model<BookDTO>
    ) { }


    async createCategory(category: CategoryDTO) {
        const existingCategory = await this.categoryModel.findOne({ name: category.name })
        console.log(existingCategory)
        if (!existingCategory) {
            throw new ConflictException('This category was already register')
        }

        const newCategory = new this.categoryModel(category)


        return newCategory.save()
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
    async getBookByCategory(category: string) {

        const findCategory = await this.categoryModel.findOne({ name: category }).exec()
        const bookByCategory = await this.bookModel.find({ category: findCategory._id }).exec()
        if (!bookByCategory) {
            throw new NotFoundException("No category found")
        }
        if (bookByCategory.length === 0) {
            return "No category yet"
        }
        console.log("bookByCategory", bookByCategory)
        return bookByCategory
    }

}
