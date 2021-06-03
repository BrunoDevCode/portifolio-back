import { verify } from 'argon2';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { SECRET } from '../../../../config/env';
import { AppError } from '../../../../errors/AppError';
import { UserRepository } from '../../repositories/implementations/UserRepository';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class LoginUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<string> {
    const user = await this.userRepository.findByEmail(email, true);

    if (!user) {
      throw new AppError('Email or password is incorrect!', 401);
    }

    if (!(await verify(user.password, password))) {
      throw new AppError('Email or password is incorrect!', 401);
    }

    const acessToken = jwt.sign({}, SECRET, {
      // eslint-disable-next-line no-underscore-dangle
      subject: `${user._id}`,
      expiresIn: '1d',
    });

    return acessToken;
  }
}

export { LoginUserUseCase };
