import { MongooseItemRepository } from '../../repositories/implementations/MongooseItemRepository';
import { CreateItemController } from './CreateItemController';
import { CreateItemUseCase } from './CreateItemUseCase';

const mongooseItemRepository = new MongooseItemRepository();
const createItemUseCase = new CreateItemUseCase(mongooseItemRepository);
const createItemController = new CreateItemController(createItemUseCase);

export { createItemController };
