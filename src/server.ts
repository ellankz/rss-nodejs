/* eslint-disable no-console */
import { getConnection, createConnection } from 'typeorm';
import app from './app';
import { logError } from './logging/winston.logger';
import { ErrorHandler } from './errors/error';
import {config, PORT} from './ormconfig';
import {createOne as createOneUser } from './resources/users/user.service';
import { authenticate } from './resources/auth/auth.service';

const connectToDB = async () => { 
  let connection;
  try {
    connection = getConnection();
  } catch {
    console.error('Connection not found. Creating.');
  }
  try {
    if (connection) {
      if (!connection.isConnected) {
        await connection.connect();        
      }
    } else {
      connection = await createConnection(config);
    }
    console.log('Connected to database');
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
    const adminData = { login: 'admin', password: 'admin', name: 'admin' };
    try {
      await authenticate({login: adminData.login, password: adminData.password});
    } catch (error) {
      console.log(error);
      await createOneUser({ login: 'admin', password: 'admin', name: 'admin' });
    }
    app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}\n`));
  });

