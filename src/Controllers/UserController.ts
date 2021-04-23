import { Request, Response } from 'express';
import { SECRET } from '../config/env';
import User from '../Model/User';
import jwt from 'jsonwebtoken';
import * as argon2 from 'argon2';

export default class UserController {
  async index(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(409).json({ error: 'Please fill all fields' });
      }

      const user = await User.findOne({ email }).select('+password');

      if (!(await argon2.verify(user.password, password))) {
        return res.status(401).json({ error: 'Invalid password!' });
      }

      user.password = null;

      return res.status(200).json({
        token: jwt.sign({ id: user._id }, SECRET, { expiresIn: 86400 }),
      });
    } catch (error) {
      return res.json({ error: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (await User.findOne({ email })) {
        return res.status(409).json({ message: 'User already exists' });
      }

      const user = await User.create({
        name,
        email,
        password,
      });

      return res.status(201).json({
        token: jwt.sign({ id: user._id }, SECRET, { expiresIn: 86400 }),
      });
    } catch (error) {
      return res.send({ error: error.message });
    }
  }
}
