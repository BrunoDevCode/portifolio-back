import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { DeleteOneItemUseCase } from './DeleteOneItemUseCase';

class DeleteOneItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const deleteOneItemUseCase = container.resolve(DeleteOneItemUseCase);

    const { id } = request.user;

    const { item_id } = request.params;

    if (!item_id) {
      throw new AppError('item_id is not provided');
    }

    await deleteOneItemUseCase.execute(item_id, id);

    return response
      .status(200)
      .json({ message: 'Item is deleted sucessfully' });
  }
}

export { DeleteOneItemController };
