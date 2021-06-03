import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { SECRET } from '../config/env';
import { AppError } from '../errors/AppError';
import { UserRepository } from '../modules/User/repositories/implementations/UserRepository';

interface IPayload {
  sub: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const acessToken = request.headers.authorization;

  if (!acessToken) {
    throw new AppError('Token is no provided', 401);
  }

  const [, token] = acessToken.split(' ');

  try {
    const { sub: user_id } = verify(token, SECRET) as IPayload;

    const userRepository = new UserRepository();

    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists', 401);
    }

    request.user = {
      // eslint-disable-next-line no-underscore-dangle
      id: user._id,
    };

    next();
  } catch {
    throw new AppError('Invalid token is provided', 401);
  }
}
