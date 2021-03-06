import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { CreateItemUseCase } from './CreateItemUseCase';

class CreateItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createItemUseCase = container.resolve(CreateItemUseCase);

    const { id } = request.user;

    const {
      name,
      quantity,
      cost,
      increaseOverCost,
      price,
      anotherPrice,
      category,
    } = request.body;

    if (!name) {
      throw new AppError('Name is no provided');
    }

    if (!price) {
      throw new AppError('Price is no provided');
    }

    await createItemUseCase.execute(
      {
        name,
        quantity,
        cost,
        increaseOverCost,
        price,
        anotherPrice,
        category,
      },
      id
    );

    return response.status(201).send();
  }
}

export { CreateItemController };
