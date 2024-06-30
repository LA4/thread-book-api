import { Controller, Post } from '@nestjs/common';
import { PublisherService } from './publisher.service';

@Controller('publisher')
export class PublisherController {

    constructor( private readonly PublisherService: PublisherService){}

    @Post('/new')
    createPublisher()

}
