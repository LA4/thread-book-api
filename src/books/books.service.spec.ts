import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Category } from 'src/category/schema/category.schema';
describe('BooksService', () => {
  let service: BooksService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
