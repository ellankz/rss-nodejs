import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
} = process.env;

// eslint-disable-next-line dot-notation
export const AUTH_MODE: boolean = process.env['AUTH_MODE'] === 'true';
