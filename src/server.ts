import { PORT } from './common/config';
import app from './app';
import { logError } from './logging/winston.logger';
import { ErrorHandler } from './errors/error';

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

app.listen(PORT, () => process.stdout.write(`App is running on http://localhost:${PORT}\n`));
