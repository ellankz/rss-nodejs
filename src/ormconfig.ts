import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../.env'),
});

export const config = {
  type: 'postgres',
  name: 'default',
  host: process.env['POSTGRES_HOST'],
  port: process.env['POSTGRES_PORT'],
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  database: process.env['POSTGRES_DB'],
  entities: ['src/resources/**/*.entity.ts'],
  migrations: ['src/migration/*.ts'],
  cli: { migrationsDir: 'src/migration' },
  migrationsRun: true,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectionInterval: 1000,
} as ConnectionOptions;

export const { PORT } = process.env;

export default config;