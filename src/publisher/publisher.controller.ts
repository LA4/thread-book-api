import { Body, Controller, Post } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { PublisherDTO } from './publisher.dto';

@Controller('publisher')
export class PublisherController {

    constructor(private readonly PublisherService: PublisherService) { }

    @Post('/new')
    createPublisher(@Body() publisher: PublisherDTO) {
        return this.PublisherService.createPublisher(publisher)
    }

}
