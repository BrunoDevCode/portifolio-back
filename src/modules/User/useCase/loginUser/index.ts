import { MongooseUserRepository } from '../../repositories/implementations/MongooseUserRepository';
import { LoginUserController } from './LoginUserController';
import { LoginUserUseCase } from './LoginUserUseCase';

const mongooseUserRepository = new MongooseUserRepository();
const loginUserUseCase = new LoginUserUseCase(mongooseUserRepository);
const loginUserController = new LoginUserController(loginUserUseCase);

export { loginUserController };
