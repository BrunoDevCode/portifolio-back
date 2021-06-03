import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListItemsUseCase } from './ListItemsUseCase';

class ListItemsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listItemsUseCase = container.resolve(ListItemsUseCase);

    const { id } = request.user;
    const { filter } = request.params;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let { limit, page }: any = request.query;

    page = page || 1;
    limit = limit || 20;
    const offset = limit * (page - 1);

    const allItems = await listItemsUseCase.execute({
      filter,
      limit,
      offset,
      user_id: id,
    });

    return response.status(200).json(allItems);
  }
}

export { ListItemsController };
