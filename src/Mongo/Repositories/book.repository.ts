import { Injectable } from '@nestjs/common';
import { BookDTO } from 'src/dtos/book.dto';
import { Model } from 'mongoose';
import { Book } from '../Interfaces/book.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BookRepository {
  constructor(@InjectModel('book') private readonly bookModel: Model<Book>) {}
  async createBook(newBook: BookDTO): Promise<Book> {
    const createBook = await this.bookModel.create(newBook);
    return createBook.save();
  }

  async getBookById(bookId: string): Promise<Book> {
    const book = await this.bookModel.findById(bookId);

    return book;
  }

  async getAllBooks(): Promise<Book[]> {
    const books = await this.bookModel.find({}, { __v: false });
    return books;
  }
}
