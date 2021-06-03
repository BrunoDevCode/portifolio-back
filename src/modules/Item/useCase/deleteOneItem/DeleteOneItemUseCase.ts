import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { IItemRepository } from '../../repositories/IItemRepository';

@injectable()
class DeleteOneItemUseCase {
  constructor(
    @inject('ItemRepository')
    private itemRepository: IItemRepository
  ) {}

  async execute(item_id: string, user_id: string): Promise<void> {
    if (!item_id) {
      throw new AppError('item_id is not provided');
    }

    if (!(await this.itemRepository.findById(item_id))) {
      throw new AppError('item is not found', 404);
    }

    await this.itemRepository.delete(item_id, user_id);
  }
}

export { DeleteOneItemUseCase };
