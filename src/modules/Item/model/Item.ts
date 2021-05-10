import { Schema, model, Document } from 'mongoose';

export interface IItem extends Document {
  name: string;
  description: string;
  quantity: number;
  cost: number | string;
  price: number | string;
  anotherPrice: number | string;
  userId: string;
  createdAt: Date;
}

const ItemModel: Schema<IItem> = new Schema({
  name: String,
  description: String,
  category: String,
  specialty: String,
  quantity: {
    type: Number,
    default: 1,
  },
  cost: Number,
  price: {
    type: Number,
    required: true,
  },
  anotherPrice: {
    type: Number,
    default: 0,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model('Item', ItemModel);
