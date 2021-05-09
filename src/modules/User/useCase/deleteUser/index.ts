import { MongooseUserRepository } from '../../repositories/implementations/MongooseUserRepository';
import { DeleteUserController } from './DeleteUserController';
import { DeleteUserUseCase } from './DeleteUserUseCase';

const userRepository = new MongooseUserRepository();
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const deleteUserController = new DeleteUserController(deleteUserUseCase);

export { deleteUserController };
