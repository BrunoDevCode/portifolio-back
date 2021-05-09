import * as argon2 from 'argon2';
import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

const UserModel: Schema<IUser> = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// eslint-disable-next-line func-names
UserModel.pre('save', async function (next) {
  this.password = await argon2.hash(this.password);
  next();
});

export default model('User', UserModel);
