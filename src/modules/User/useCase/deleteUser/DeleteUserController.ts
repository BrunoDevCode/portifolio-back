import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteUserUseCase } from './DeleteUserUseCase';

class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const deleteUserUseCase = container.resolve(DeleteUserUseCase);

      const { id } = request.user;

      await deleteUserUseCase.execute(id);

      return response.status(200).json({ message: 'User deleted Sucessfully' });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { DeleteUserController };
