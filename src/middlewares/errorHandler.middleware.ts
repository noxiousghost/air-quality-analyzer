/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { envVars } from '../configs/envVars.config';
import logger from '../configs/logger.config';
import { AppError } from '../configs/error.config';

type ErrorWithStatusCode = Error & { statusCode?: number };

const errorTypes: Record<string, { statusCode: number; message: string }> = {
  CastError: { statusCode: 400, message: 'Malformed ID' },
  ValidationError: { statusCode: 400, message: '' },
  JsonWebTokenError: { statusCode: 401, message: 'Invalid token' },
  TokenExpiredError: { statusCode: 401, message: 'Token expired' },
};

export const errorHandler = (
  err: ErrorWithStatusCode,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(`${err.stack}`);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.name in errorTypes) {
    const { statusCode: code, message: msg } = errorTypes[err.name];
    statusCode = code;
    message = err.name === 'ValidationError' ? err.message : msg;
  }

  res.status(statusCode).json({
    status: 'error',
    message,
    ...(envVars.ENV === 'development' && { stack: err.stack }),
  });
};

export { AppError };
