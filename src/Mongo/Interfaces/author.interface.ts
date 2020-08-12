import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface Author extends Document {
  readonly _id: mongoose.Schema.Types.ObjectId;
  readonly name: string;
  readonly surname: string;
}
