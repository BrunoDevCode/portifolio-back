import { verify } from 'argon2';
import { sign } from 'jsonwebtoken';

import { SECRET } from '../../../../config/env';
import { IUser } from '../../model/User';
import { MongooseUserRepository } from '../../repositories/implementations/MongooseUserRepository';

interface IRequest {
  email: string;
  password: string;
}

class LoginUserUseCase {
  constructor(private userRepository: MongooseUserRepository) {}

  private createToken(id: string) {
    return sign({ id }, SECRET, { expiresIn: 86400 });
  }

  async execute({ email, password }: IRequest): Promise<string> {
    const user: IUser = await this.userRepository.findByEmail(email, true);

    if (!(await verify(user.password, password))) {
      throw new Error('Invalid password !');
    }

    // eslint-disable-next-line no-underscore-dangle
    return this.createToken(user._id);
  }
}

export { LoginUserUseCase };
