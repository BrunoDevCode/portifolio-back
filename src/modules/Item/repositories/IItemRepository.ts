import { ICreateItemDTO, ISearchItemDTO, IUpdateItemDTO } from '../dtos';
import { IItem } from '../model/Item';

interface IItemRepository {
  findByFilter(data: ISearchItemDTO): Promise<IItem[]>;
  create(data: ICreateItemDTO, user_id: string): Promise<void>;
  update(data: IUpdateItemDTO, item_id: string): Promise<void>;
  countOfItems(filter: string, user_id: string): Promise<number>;
  findById(item_id: string): Promise<IItem>;
  delete(item_id: string, user_id: string): Promise<void>;
}

export { IItemRepository };
