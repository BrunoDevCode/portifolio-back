import { MongooseItemRepository } from '../../repositories/implementations/MongooseItemRepository';
import { ListItemsController } from './ListItemsController';
import { ListItemsUseCase } from './ListItemsUseCase';

const mongooseItemsRepository = new MongooseItemRepository();
const listItemsUseCase = new ListItemsUseCase(mongooseItemsRepository);
const listItemsController = new ListItemsController(listItemsUseCase);

export { listItemsController };
