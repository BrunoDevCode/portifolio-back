import { inject, injectable } from 'tsyringe';

import { deformatValue } from '../../../../lib/utils';
import { IUpdateItemDTO } from '../../dtos';
import { IItemRepository } from '../../repositories/IItemRepository';

@injectable()
class UpdateOneItemUseCase {
  constructor(
    @inject('ItemRepository')
    private itemRepository: IItemRepository
  ) {}

  async execute(
    {
      name,
      quantity,
      category,
      cost,
      increaseOverCost,
      price,
      anotherPrice,
    }: IUpdateItemDTO,
    id: string
  ): Promise<void> {
    let deformatCost = deformatValue(cost);
    const deformatIncreaseOverCost = deformatValue(increaseOverCost);

    if (deformatIncreaseOverCost !== 0)
      deformatCost += (cost / 100) * deformatIncreaseOverCost;

    await this.itemRepository.update(
      {
        name,
        quantity,
        category,
        cost: deformatCost,
        increaseOverCost,
        price: deformatValue(price),
        anotherPrice: deformatValue(anotherPrice),
      },
      id
    );
  }
}

export { UpdateOneItemUseCase };
