import express, { NextFunction, Request, Response } from 'express';
import { routes } from './routes';
import { connect } from 'mongoose';
import cors from 'cors';
import { MONGO_URI } from './config/env';
import { AppError } from './config/AppError';

connect(MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
}).then(() => console.log('> DB connection sucessful'));

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
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
