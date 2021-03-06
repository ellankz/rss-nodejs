import express, { Request, Response, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

import helmet from 'helmet';
import cors from 'cors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import authRouter from './resources/auth/auth.router';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import { logError, logRequest } from './logging/winston.logger';
import { ErrorHandler, handleError } from './errors/error';

import { checkJWT } from './jwt/jwt';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(helmet());
app.use(cors());

app.use(express.json());

app.use(logRequest);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', authRouter);

app.use(checkJWT);

app.use('/users', userRouter);
app.use('/boards', taskRouter);
app.use('/boards', boardRouter);

app.use((err: Error | ErrorHandler, _req: Request, res: Response, next: NextFunction) => {
  const error = err instanceof ErrorHandler ? err : new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR);
  logError(error);  

  handleError(error, res);
  next(err);
});

export default app;
