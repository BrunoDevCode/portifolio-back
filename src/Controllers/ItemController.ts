import { Request, Response } from 'express';
import Item from '../Model/Item';
import { deformatValue } from '../lib/utils';

export default class ItemController {
  async index(req: Request, res: Response) {
    let { filter, page, limit }: any = req.query;
    const { userId } = req.headers;

    page = page || 1;
    limit = limit || 30;
    let offset = limit * (page - 1);

    const allItems = await Item.find({
      userId: { $eq: userId },
      $or: [
        { name: { $regex: String(filter), $options: 'gi' } },
        { category: { $regex: String(filter), $options: 'gi' } },
      ],
    });

    const totalPages = Math.ceil(allItems.length / limit || 1);

    const items = await Item.find({
      userId: { $eq: userId },
      $or: [
        { name: { $regex: String(filter), $options: 'gi' } },
        { category: { $regex: String(filter), $options: 'gi' } },
      ],
    })
      .limit(limit)
      .skip(offset);

    return res.status(200).json({ items, config: { totalPages } });
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

      console.log(req.body);
      console.log(req.headers);

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
      const { userId } = req.headers;

      await Item.findOneAndDelete({ _id: itemId, userId: { $eq: userId } });

      return res.status(200).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
