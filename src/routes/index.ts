import { Router } from 'express';

import { itemRoutes } from './itemRoutes';
import { userRoutes } from './userRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/items', itemRoutes);

export { router };
