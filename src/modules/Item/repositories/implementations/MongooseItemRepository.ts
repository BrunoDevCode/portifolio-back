import Item, { IItem } from '../../model/Item';
import {
  IItemRepository,
  ICreateItemDTO,
  IUpdateItemDTO,
  ISearchItemDTO,
} from '../IItemRepository';

class MongooseItemRepository implements IItemRepository {
  async findByFilter({
    filter,
    user_id,
    limit,
    offset,
  }: ISearchItemDTO): Promise<IItem[]> {
    const items = await Item.find({
      userId: { $eq: user_id },
      $or: [
        { name: { $regex: String(filter), $options: 'gi' } },
        { category: { $regex: String(filter), $options: 'gi' } },
      ],
    })
      .limit(limit)
      .skip(offset);

    return items;
  }

  async countOfItems(filter: string, user_id: string): Promise<number> {
    const allItems = await Item.find({
      userId: { $eq: user_id },
      $or: [
        { name: { $regex: String(filter), $options: 'gi' } },
        { category: { $regex: String(filter), $options: 'gi' } },
      ],
    });

    return allItems.length;
  }

  async findById(item_id: string): Promise<IItem> {
    const item = await Item.findById(item_id);

    return item;
  }

  async create(data: ICreateItemDTO, user_id: string): Promise<void> {
    await Item.create({ ...data, user_id });
  }

  async update(data: IUpdateItemDTO, item_id: string): Promise<void> {
    await Item.findOneAndUpdate(
      { _id: item_id },
      {
        $set: {
          ...data,
        },
      }
    );
  }

  async delete(item_id: string, user_id: string): Promise<void> {
    await Item.findOneAndDelete({ _id: item_id, userId: { $eq: user_id } });
  }
}

export { MongooseItemRepository };
