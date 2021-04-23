import { Request, Response } from 'express';
import Item, { IItem } from '../Model/Item';
import { deformatValue, formatPrice } from '../lib/utils';

export default class ItemController {
  async index(req: Request, res: Response) {
    const { name } = req.query;

    const nameWithRegex = new RegExp(`${name}`, 'gim');

    const items = await Item.find({
      name: { $regex: nameWithRegex },
    });

    return res.status(200).json(items);
  }

  async show(req: Request, res: Response) {
    try {
      const { itemId } = req.params;

      const item = await Item.findById(itemId);

      return res.status(200).json(item);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { userId } = req.headers;
      let {
        name,
        cost,
        increaseOverCost,
        price,
        anotherPrice,
        category,
      } = req.body;

      cost = deformatValue(cost);
      increaseOverCost = deformatValue(increaseOverCost);
      if (increaseOverCost !== 0) cost = cost + (cost / 100) * increaseOverCost;

      price = deformatValue(price);
      anotherPrice = deformatValue(anotherPrice);

      if (name === '' || price === 0)
        return res
          .status(400)
          .json({ error: 'Please fill at least name and price field' });

      await Item.create({
        name,
        cost,
        price,
        anotherPrice,
        category,
        userId,
      });

      return res.status(201).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { itemId } = req.params;
      let {
        name,
        cost,
        increaseOverCost,
        price,
        anotherPrice,
        category,
      } = req.body;

      cost = deformatValue(cost);
      increaseOverCost = deformatValue(increaseOverCost);

      if (increaseOverCost !== 0) cost = cost + (cost / 100) * increaseOverCost;

      price = deformatValue(price);
      anotherPrice = deformatValue(anotherPrice);

      await Item.findOneAndUpdate(
        { _id: itemId },
        {
          $set: {
            name,
            cost,
            price,
            anotherPrice,
            category,
          },
        }
      );

      return res.status(200).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { itemId } = req.params;

      await Item.findOneAndDelete({ _id: itemId });

      return res.status(200).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
