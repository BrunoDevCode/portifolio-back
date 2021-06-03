import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { LoginUserUseCase } from './LoginUserUseCase';

class LoginUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const loginUserUseCase = container.resolve(LoginUserUseCase);

    const { email, password } = request.body;

    if (!email) {
      throw new AppError('Email is no provided');
    }

    if (!password) {
      throw new AppError('Password is no provided');
    }

    const acessToken = await loginUserUseCase.execute({ email, password });

    return response.status(200).json({ acessToken });
  }
}

export { LoginUserController };
