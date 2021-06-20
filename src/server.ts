import { getConnection, createConnection } from 'typeorm';
import app from './app';
import { logError } from './logging/winston.logger';
import { ErrorHandler } from './errors/error';
import {config, PORT} from './ormconfig';

process
  .on('unhandledRejection', reason => {
    const message = `Unhandled Rejection at Promise: ${reason instanceof Error ? reason.message : 'unknow error'}`
    logError(new ErrorHandler(500, `Unhandled Rejection at Promise: ${message}`));
    process.exit(1);
  })
  .on('uncaughtException', err => {
    logError(new ErrorHandler(500, `Uncaught Exception: ${err.message}`));
    process.exit(1);
  });

const connectToDB = async () => {
  let connection;
  try {
    connection = getConnection();
  } catch {
    process.stdout.write('Connection hasn\'t yet been established. Connecting.');
  }

  try {
    if (connection) {
      if (!connection.isConnected) {
        await connection.connect();        
      }
    } else {
      connection = await createConnection(config);
    }
    process.stdout.write('Connected to database');
  } catch (error) {
    process.stderr.write(error);
  }
}

const tryDBConnect = async (cb: () => void) => {
  try {
    await connectToDB();
    cb();
  } catch(error){
    process.stderr.write(error);
    process.exit(1);
  }
}



  tryDBConnect(() => app.listen(PORT, () => process.stdout.write(`App is running on http://localhost:${PORT}\n`)));

