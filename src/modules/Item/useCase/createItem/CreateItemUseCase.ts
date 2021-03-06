import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { deformatValue } from '../../../../lib/utils';
import { ICreateItemDTO } from '../../dtos';
import { ItemRepository } from '../../repositories/implementations/ItemRepository';

@injectable()
class CreateItemUseCase {
  constructor(
    @inject('ItemRepository')
    private itemRepository: ItemRepository
  ) {}

  async execute(
    {
      name,
      category,
      quantity,
      price,
      cost,
      anotherPrice,
      increaseOverCost,
    }: ICreateItemDTO,
    user_id: string
  ): Promise<void> {
    let deformatCost = deformatValue(cost);
    const deformatIncreaseOverCost = deformatValue(increaseOverCost);

    if (deformatIncreaseOverCost !== 0)
      deformatCost += (cost / 100) * deformatIncreaseOverCost;

    if (!name) {
      throw new AppError('Name is no provided');
    }

    await this.itemRepository.create(
      {
        name,
        category,
        quantity,
        cost: deformatCost,
        price: deformatValue(price),
        anotherPrice: deformatValue(anotherPrice),
      },
      user_id
    );
  }
}

export { CreateItemUseCase };
