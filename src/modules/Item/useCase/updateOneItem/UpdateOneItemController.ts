import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { UpdateOneItemUseCase } from './UpdateOneItemUseCase';

class UpdateOneItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateOneUseCase = container.resolve(UpdateOneItemUseCase);

    const { item_id } = request.params;

    if (!item_id) {
      throw new AppError('item_id is not provided');
    }

    const {
      name,
      quantity,
      cost,
      increaseOverCost,
      price,
      anotherPrice,
      category,
    } = request.body;

    await updateOneUseCase.execute(
      {
        name,
        quantity,
        cost,
        increaseOverCost,
        price,
        anotherPrice,
        category,
      },
      item_id
    );

    return response.status(200).json({ message: 'Item updated sucessfully' });
  }
}

export { UpdateOneItemController };
