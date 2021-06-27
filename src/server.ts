/* eslint-disable no-console */
import { getConnection, createConnection } from 'typeorm';
import app from './app';
import { logError } from './logging/winston.logger';
import { ErrorHandler } from './errors/error';
import {config, PORT} from './ormconfig';
import {createOne as createOneUser } from './resources/users/user.service';

const connectToDB = async () => { 
  try {
    let connection = getConnection();
    if (connection) {
      if (!connection.isConnected) {
        await connection.connect();        
      }
    } else {
      connection = await createConnection(config);
    }
    process.stdout.write('Connected to database');
  } catch (error) {
    console.error(error);
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




  tryDBConnect(async () => {
    app.listen(PORT, () => process.stdout.write(`App is running on http://localhost:${PORT}\n`));
  });

