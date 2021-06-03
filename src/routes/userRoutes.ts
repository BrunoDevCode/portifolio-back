import { Router } from 'express';

import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';
import { CreateUserController } from '../modules/User/useCase/createUser/CreateUserController';
import { DeleteUserController } from '../modules/User/useCase/deleteUser/DeleteUserController';
import { LoginUserController } from '../modules/User/useCase/loginUser/LoginUserController';

const userRoutes = Router();

const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();
const deleteUserController = new DeleteUserController();

userRoutes.post('/register', createUserController.handle);
userRoutes.post('/login', loginUserController.handle);
userRoutes.delete('/delete', ensureAuthenticate, deleteUserController.handle);

export { userRoutes };
