import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { BookDTO } from 'src/dtos/book.dto';
import { BooksService } from 'src/Services/books/books.service';
import { Book } from 'src/Mongo/Interfaces/book.interface';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}
  @Get()
  async getAllBooks(): Promise<Book[]> {
    return await this.bookService.getAllBooks();
  }

  @Get(':id')
  async getBookById(@Param('id') bookId: string): Promise<Book> {
    const book = await this.bookService.getBookById(bookId);

    if (!book) {
      throw new BadRequestException('Book not found');
    }
    return book;
  }

  @Post()
  async createBook(@Body() newBook: BookDTO): Promise<Book> {
    return await this.bookService.createBook(newBook);
  }
}
