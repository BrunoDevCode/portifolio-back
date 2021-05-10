import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { SECRET } from '../../../../config/env';
import { CreateItemUseCase } from './CreateItemUseCase';

interface IToken {
  id: string;
  exp: number;
  iat: number;
}

class CreateItemController {
  constructor(private createItemUseCase: CreateItemUseCase) {}

  private getUserId(token: string) {
    const { id } = <IToken>verify(token, SECRET);
    return id;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const token = request.headers.authorization;

      const {
        name,
        cost,
        increaseOverCost,
        price,
        anotherPrice,
        category,
      } = request.body;

      await this.createItemUseCase.execute(
        {
          name,
          cost,
          increaseOverCost,
          price,
          anotherPrice,
          category,
        },
        this.getUserId(String(token))
      );

      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { CreateItemController };
