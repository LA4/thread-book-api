import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from './schema/author.schema';
import { AuthorDTO } from './author.dto';
import { Model } from 'mongoose';

@Injectable()
export class AuthorService {

    constructor(@InjectModel(Author.name) private authorModel: Model<AuthorDTO>) { }

    async createAuthor(author: AuthorDTO) {
        const existingAuthor = await this.authorModel.findOne({ name: author.name })
        if (!existingAuthor) {
            throw new ConflictException('this Author is already exiting')
        }
        const newAuthor = new this.authorModel(author)

        return newAuthor.save()
    }

    async getAllAuthor() {

        const allAuthor = await this.authorModel.find().exec()
        if (!allAuthor) {
            throw new NotFoundException("No category found")
        }
        if (allAuthor.length === 0) {
            return "No category yet"
        }
        return allAuthor
    }
}
