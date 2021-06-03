import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { IItem } from '../../model/Item';
import { IItemRepository } from '../../repositories/IItemRepository';

@injectable()
class ListOneItemUseCase {
  constructor(
    @inject('ItemRepository')
    private itemRepository: IItemRepository
  ) {}

  async execute(item_id: string): Promise<IItem> {
    if (!item_id) {
      throw new AppError('item_id is no provided');
    }

    const item = await this.itemRepository.findById(item_id);

    if (!item) {
      throw new AppError('Item is not found', 404);
    }

    return item;
  }
}

export { ListOneItemUseCase };
