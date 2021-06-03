import { inject, injectable } from 'tsyringe';

import { ISearchItemDTO } from '../../dtos';
import { IItem } from '../../model/Item';
import { ItemRepository } from '../../repositories/implementations/ItemRepository';

@injectable()
class ListItemsUseCase {
  constructor(
    @inject('ItemRepository')
    private itemRepository: ItemRepository
  ) {}

  async execute({
    filter,
    limit,
    offset,
    user_id,
  }: ISearchItemDTO): Promise<IItem[]> {
    const items = await this.itemRepository.findByFilter({
      filter,
      limit,
      offset,
      user_id,
    });

    return items;
  }
}

export { ListItemsUseCase };
