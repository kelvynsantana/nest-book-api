import { Document } from 'mongoose';
import { Author } from './author.interface';

export interface Book extends Document {
  readonly _id: string;
  readonly name: string;
  readonly author: Author[];
  readonly language: string;
  readonly releaseYear: number;
  readonly publisher: string;
  readonly pages: number;
}
