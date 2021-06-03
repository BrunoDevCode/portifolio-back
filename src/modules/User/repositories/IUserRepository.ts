import { IUser } from '../model/User';

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

interface IUserRepository {
  findByEmail(email: string): Promise<IUser>;
  findById(id: string): Promise<IUser>;
  create({ name, email, password }: ICreateUserDTO): Promise<string>;
  delete(user_id: string): Promise<void>;
}

export { IUserRepository, ICreateUserDTO };
