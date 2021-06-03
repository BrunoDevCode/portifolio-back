import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { UserRepository } from '../../repositories/implementations/UserRepository';

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository
  ) {}

  async execute(user_id: string): Promise<void> {
    if (!(await this.userRepository.findById(user_id))) {
      throw new AppError('User does not exists!', 404);
    }

    await this.userRepository.delete(user_id);
  }
}

export { DeleteUserUseCase };
