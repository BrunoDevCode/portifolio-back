import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { SECRET } from '../../../../config/env';
import { AppError } from '../../../../errors/AppError';
import { UserRepository } from '../../repositories/implementations/UserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository
  ) {}

  async execute({ name, email, password }: IRequest): Promise<string> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('User already exists!');
    }

    const id = await this.userRepository.create({
      name,
      email,
      password,
    });

    const acessToken = jwt.sign({}, SECRET, {
      expiresIn: '1d',
      subject: `${id}`,
    });

    return acessToken;
  }
}

export { CreateUserUseCase };
