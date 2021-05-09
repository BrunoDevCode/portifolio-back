import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

import { SECRET } from '../../../../config/env';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  private createToken(id: string) {
    return sign({ id }, SECRET, { expiresIn: 86400 });
  }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const id = await this.createUserUseCase.execute({
        name,
        email,
        password,
      });

      return response.status(201).json({ token: this.createToken(id) });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { CreateUserController };
