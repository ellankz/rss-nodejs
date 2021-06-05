import { Response } from 'express';

export class ErrorHandler extends Error {
  statusCode: number;

  constructor(statusCode: number|undefined, message: string|undefined) {
    super();
    this.statusCode = statusCode || 500;
    this.message = (statusCode && message) ? message : 'Internal server error';
  }
}

export const handleError = (err: ErrorHandler, res: Response): void => {
  const {statusCode, message} = err;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
}