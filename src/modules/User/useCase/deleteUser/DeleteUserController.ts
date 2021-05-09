import { Request, Response } from 'express';

import { DeleteUserUseCase } from './DeleteUserUseCase';

class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id } = request.params;

      await this.deleteUserUseCase.execute(user_id);

      return response.status(200).json({ message: 'User deleted Sucessfully' });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { DeleteUserController };
