import { Router } from 'express';
import ItemController from './Controllers/ItemController';
import UserController from './Controllers/UserController';
import TokenMiddleware from './Middleware/TokenMiddleware';

const routes = Router();

const userController = new UserController();
const itemController = new ItemController();

routes.post('/user/login', userController.index);
routes.post('/user/register', userController.create);

routes.get('/item/:itemId', itemController.show);

routes.use(TokenMiddleware, [
  routes.get('/item', itemController.index),
  routes.post('/item', itemController.create),
  routes.put('/item/:itemId', itemController.update),
  routes.delete('/item/:itemId', itemController.delete),
]);

export { routes };
