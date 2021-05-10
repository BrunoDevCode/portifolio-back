import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { SECRET } from '../../../../config/env';
import { ListItemsUseCase } from './ListItemsUseCase';

interface IToken {
  id: string;
  exp: number;
  iat: number;
}

class ListItemsController {
  constructor(private listItemsUseCase: ListItemsUseCase) {}

  private getUserId(token: string): string {
    const { id } = <IToken>verify(token, SECRET);
    return id;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const token = <string>request.headers.authorization;

      const { filter } = request.params;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let { limit, page }: any = request.query;

      page = page || 1;
      limit = limit || 20;
      const offset = limit * (page - 1);

      const allItems = await this.listItemsUseCase.execute({
        filter,
        limit,
        offset,
        user_id: this.getUserId(token),
      });

      return response.status(200).json(allItems);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { ListItemsController };
