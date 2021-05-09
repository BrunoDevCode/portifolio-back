import { MongooseUserRepository } from '../../repositories/implementations/MongooseUserRepository';

class DeleteUserUseCase {
  constructor(private userRepository: MongooseUserRepository) {}

  async execute(user_id: string): Promise<void> {
    if (!(await this.userRepository.findById(user_id))) {
      throw new Error('User does not exists!');
    }

    await this.userRepository.delete(user_id);
  }
}

export { DeleteUserUseCase };
