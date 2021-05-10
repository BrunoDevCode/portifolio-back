import { IItem } from '../../model/Item';
import { MongooseItemRepository } from '../../repositories/implementations/MongooseItemRepository';

interface IRequest {
  filter: string;
  limit: number;
  offset: number;
  user_id: string;
}

class ListItemsUseCase {
  constructor(private itemRepository: MongooseItemRepository) {}

  async execute({
    filter,
    limit,
    offset,
    user_id,
  }: IRequest): Promise<IItem[]> {
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
