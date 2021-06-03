import { container } from 'tsyringe';

import { IItemRepository } from '../../modules/Item/repositories/IItemRepository';
import { ItemRepository } from '../../modules/Item/repositories/implementations/ItemRepository';
import { UserRepository } from '../../modules/User/repositories/implementations/UserRepository';
import { IUserRepository } from '../../modules/User/repositories/IUserRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IItemRepository>('ItemRepository', ItemRepository);
