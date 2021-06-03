import User, { IUser } from '../../model/User';
import { ICreateUserDTO, IUserRepository } from '../IUserRepository';

class UserRepository implements IUserRepository {
  async findByEmail(email: string, password = false): Promise<IUser> {
    let user: IUser;

    if (password) {
      user = await User.findOne({ email }).select('+password');
      return user;
    }

    user = await User.findOne({ email });

    return user;
  }

  async findById(user_id: string): Promise<IUser> {
    const user: IUser = await User.findOne({ _id: user_id });

    return user;
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<string> {
    const { _id } = await User.create({
      name,
      email,
      password,
    });

    return _id;
  }

  async delete(user_id: string): Promise<void> {
    await User.deleteOne({ _id: user_id });
  }
}

export { UserRepository };
