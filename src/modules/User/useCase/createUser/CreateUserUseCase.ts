import { MongooseUserRepository } from '../../repositories/implementations/MongooseUserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserUseCase {
  constructor(private userRepository: MongooseUserRepository) {}

  async execute({ name, email, password }: IRequest): Promise<string> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new Error('User already exists!');
    }

    const id = this.userRepository.register({ name, email, password });

    return id;
  }
}

export { CreateUserUseCase };
