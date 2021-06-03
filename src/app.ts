import 'reflect-metadata';

import cors from 'cors';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';

import { AppError } from './errors/AppError';
import { router } from './routes';

import './database';

import './shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'Error',
      message: `Internal server error ${error.message}`,
    });
  }
);

export { app };
