import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { ListOneItemUseCase } from './ListOneItemUseCase';

class ListOneItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listOneItemUseCase = container.resolve(ListOneItemUseCase);

    const { item_id } = request.params;

    if (!item_id) {
      throw new AppError('item_id is no provided');
    }

    const item = await listOneItemUseCase.execute(item_id);

    return response.status(200).json({ item });
  }
}

export { ListOneItemController };
