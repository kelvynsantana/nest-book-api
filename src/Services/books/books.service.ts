import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
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
      throw new HttpException(
        {
          status: 'error',
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'there are note Books to display',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return books;
  }

  async deleteBook(bookId: string): Promise<any> {
    const book = await this.bookRepository.getBookById(bookId);

    if (!book) {
      throw new HttpException(
        {
          status: 'error',
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Book not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.bookRepository.deleteBook(bookId);

    throw new HttpException(
      {
        status: 'success',
        statusCode: HttpStatus.OK,
        message: 'Book successfull deleted',
      },
      HttpStatus.OK,
    );
  }
}
