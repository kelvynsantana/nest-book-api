import { Injectable, BadRequestException, HttpException } from '@nestjs/common';
import { BookDTO } from 'src/dtos/book.dto';
import { BookRepository } from 'src/Mongo/Repositories/book.repository';
import { Book } from 'src/Mongo/Interfaces/book.interface';

@Injectable()
export class BooksService {
  constructor(private readonly bookRepository: BookRepository) {}
  async createBook(newBook: BookDTO): Promise<Book> {
    return await this.bookRepository.createBook(newBook);
  }

  async getBookById(bookId: string): Promise<Book> {
    const book = await this.bookRepository.getBookById(bookId);

    return book;
  }

  async getAllBooks(): Promise<Book[]> {
    const books = await this.bookRepository.getAllBooks();

    if (!books.length) {
      throw new BadRequestException('');
    }

    return books;
  }
}
