import { Request, Response, NextFunction, request } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET } from '../config/env';
import User from '../Model/User';

interface IToken {
  id: string;
  exp: number;
  iat: number;
}

export default async function TokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Token not provided' });
    }

    const decodedToken = <IToken>verify(token, SECRET);

    if (!decodedToken.id) {
      return res.status(401).json({ error: 'Token not provided' });
    }

    if (!(await User.findById(decodedToken.id))) {
      return res.status(409).json({ error: 'User not exists' });
    }

    req.headers.userId = decodedToken.id;

    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
