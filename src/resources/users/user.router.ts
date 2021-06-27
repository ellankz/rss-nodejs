import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ErrorHandler } from '../../errors/error';
import { includesAll, includesSome } from '../../helpers/testParamsValid';
import { logResponse } from '../../logging/winston.logger';
import { User } from '../../entities/User';
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './user.service';

const router = express.Router();

router
  .route('/')
  .get(async (_req, res, next) => {
    try {
      const users = await getAll();
      if (users) {
        logResponse(res);
        res.json(users.map(User.toResponse));
      } else {
        throw new ErrorHandler(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
      }
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      
      if (!includesAll(Object.keys(req.body), ['name', 'login', 'password'])) {
        throw new ErrorHandler(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
      } else {
        const user = await createOne(req.body);
        if (user) {
          res.status(StatusCodes.CREATED);
          logResponse(res);
          res.json(User.toResponse(user));
        }
      }
    } catch (error) {
      next(error);
    }
  });

router
  .route('/:userId')
  .get(async (req, res, next) => {
    try {
      const user = await getOne(req.params.userId);
      if (user) {
        logResponse(res);
        res.json(User.toResponse(user));
      } else {
        throw new ErrorHandler(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
      }
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      if (!includesSome(Object.keys(req.body), ['name', 'login', 'password'])) {
        throw new ErrorHandler(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST);
      } 
      const user = await updateOne(req.params.userId, req.body);
      if (user) {
        logResponse(res);
        res.json(User.toResponse(user));
      } else {
        throw new ErrorHandler(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
      }
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const isDeleted = await deleteOne(req.params.userId);
      if (isDeleted) {
        res.status(StatusCodes.NO_CONTENT);
        logResponse(res);
        res.send();
      } else {
        throw new ErrorHandler(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
      }
    } catch (error) {
      next(error);
    }
  });

export default router;
