import { deformatValue } from '../../../../lib/utils';
import { MongooseItemRepository } from '../../repositories/implementations/MongooseItemRepository';

interface IRequest {
  name: string;
  cost: number;
  increaseOverCost: number;
  price: number;
  anotherPrice: number;
  category: string;
}

class CreateItemUseCase {
  constructor(private itemRepository: MongooseItemRepository) {}

  async execute(
    { name, category, price, cost, anotherPrice, increaseOverCost }: IRequest,
    user_id: string
  ): Promise<void> {
    let deformatCost = deformatValue(cost);
    const deformatIncreaseOverCost = deformatValue(increaseOverCost);

    if (deformatIncreaseOverCost !== 0)
      deformatCost += (cost / 100) * deformatIncreaseOverCost;

    if (name === '') {
      throw new Error('Please fill at least name and price field');
    }

    await this.itemRepository.create(
      {
        name,
        category,
        cost: deformatCost,
        price: deformatValue(price),
        anotherPrice: deformatValue(anotherPrice),
      },
      user_id
    );
  }
}

export { CreateItemUseCase };
