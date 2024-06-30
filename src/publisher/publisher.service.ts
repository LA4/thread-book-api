import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Publisher } from './schema/publisher.schema';
import { Model } from 'mongoose';
import { PublisherDTO } from './publisher.dto';
import { publish } from 'rxjs';

@Injectable()
export class PublisherService {
    constructor(@InjectModel(Publisher.name) private publisherModel: Model<PublisherDTO>) { }
    async createPublisher(publisher: PublisherDTO) {

        const existingPublisher = await this.publisherModel.findOne({ name: publisher.name })
        if (!existingPublisher) {
            throw new ConflictException('this Publisher is already existing')
        }
        const newPublisher = new this.publisherModel(publisher)

        return newPublisher.save()

    }
}
