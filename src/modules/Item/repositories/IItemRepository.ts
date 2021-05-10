import { IItem } from '../model/Item';

interface ICreateItemDTO {
  name: string;
  cost: number;
  price: number;
  anotherPrice: number;
  category: string;
}

interface IUpdateItemDTO {
  id: string;
  name: string;
  cost: number;
  price: number;
  anotherPrice: number;
  category: string;
}

interface ISearchItemDTO {
  filter: string;
  user_id: string;
  limit: number;
  offset: number;
}

interface IItemRepository {
  findByFilter({
    filter,
    user_id,
    limit,
    offset,
  }: ISearchItemDTO): Promise<IItem[]>;
  countOfItems(filter: string, user_id: string): Promise<number>;
  findById(item_id: string, user_id: string): Promise<IItem>;
  create(data: ICreateItemDTO, user_id: string): Promise<void>;
  update(data: IUpdateItemDTO, item_id: string): Promise<void>;
  delete(item_id: string, user_id: string): Promise<void>;
}

export { IItemRepository, IUpdateItemDTO, ICreateItemDTO, ISearchItemDTO };
