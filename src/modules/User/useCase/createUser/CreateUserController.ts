import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserUseCase = container.resolve(CreateUserUseCase);

    const { name, email, password } = request.body;

    const acessToken = await createUserUseCase.execute({
      name,
      email,
      password,
    });

    return response.status(201).json({ acessToken });
  }
}

export { CreateUserController };
