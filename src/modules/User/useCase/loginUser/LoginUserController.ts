import { Request, Response } from 'express';

import { LoginUserUseCase } from './LoginUserUseCase';

class LoginUserController {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const token = await this.loginUserUseCase.execute({ email, password });

      return response.status(200).json({ token });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { LoginUserController };
