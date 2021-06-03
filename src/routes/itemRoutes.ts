import { Router } from 'express';

import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';
import { CreateItemController } from '../modules/Item/useCase/createItem/CreateItemController';
import { DeleteOneItemController } from '../modules/Item/useCase/deleteOneItem/DeleteOneItemController';
import { ListItemsController } from '../modules/Item/useCase/listItems/ListItemsController';
import { ListOneItemController } from '../modules/Item/useCase/listOneItem/ListOneItemController';
import { UpdateOneItemController } from '../modules/Item/useCase/updateOneItem/UpdateOneItemController';

const itemRoutes = Router();

const createItemController = new CreateItemController();
const listItemsController = new ListItemsController();
const listOneItemController = new ListOneItemController();
const updateOneItemController = new UpdateOneItemController();
const deleteOneItemController = new DeleteOneItemController();

itemRoutes.use(ensureAuthenticate);
itemRoutes.post('/one/create', createItemController.handle);
itemRoutes.get('/filter/:filter', listItemsController.handle);
itemRoutes.get('/one/:item_id/', listOneItemController.handle);
itemRoutes.put('/one/:item_id', updateOneItemController.handle);
itemRoutes.delete('/one/:item_id', deleteOneItemController.handle);

export { itemRoutes };
