import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ErrorHandler } from '../../errors/error';
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './task.service';

const router = express.Router({ mergeParams: true });

router
  .route('/:boardId/tasks/')
  .get(async (req, res, next) => {
    try {
      const tasks = await getAll(req.params.boardId);
      if (tasks) {
        res.json(tasks);
      } else {
        throw new ErrorHandler(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
      }
    } catch(error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      if (!req.body.title) {
        throw new ErrorHandler(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST);
      } 

      const task = await createOne(req.params.boardId, req.body);
      if (task) {
        res.status(201);
        res.json(task);
      } else {
        throw new ErrorHandler(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
      }
    } catch(error) {
      next(error);
    }
  });

router
  .route('/:boardId/tasks/:taskId')
  .get(async (req, res, next) => {
    try {
      const task = await getOne(req.params.boardId, req.params.taskId);
      if (task) {
        res.json(task);
      } else {
        throw new ErrorHandler(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
      }
    } catch(error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      if (!req.body.title){
        throw new ErrorHandler(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST);
      }
      const task = await updateOne(
        req.params.boardId,
        req.params.taskId,
        req.body,
      );
      if (task) {
        res.json(task);
      } else {
        throw new ErrorHandler(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
      }
    } catch(error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { boardId, taskId } = req.params;
      if (boardId && taskId) {
        const isDeleted = await deleteOne(boardId, taskId);
        if (isDeleted) {
          res.status(204).send('Task has been deleted');
        } else {
          throw new ErrorHandler(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
        }
      } else {
        throw new ErrorHandler(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
      }
    } catch(error) {
      next(error);
    }
  });

export default router;
