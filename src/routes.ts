import { Router } from 'express';
import ItemController from './Controllers/ItemController';
import UserController from './Controllers/UserController';
import TokenMiddleware from './Middleware/TokenMiddleware';

const routes = Router();

const userController = new UserController();
const itemController = new ItemController();

routes.post('/user/login', userController.index);
routes.post('/user/register', userController.create);
// routes.post('/allItems', itemController.all);

routes.get('/item/:itemId', itemController.show);

routes.get('/item', TokenMiddleware, itemController.index);
routes.post('/item', TokenMiddleware, itemController.create);
routes.put('/item/:itemId', TokenMiddleware, itemController.update);
routes.delete('/item/:itemId', TokenMiddleware, itemController.delete);

export { routes };
