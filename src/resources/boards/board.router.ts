import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ErrorHandler } from '../../errors/error';
import { logResponse } from '../../logging/winston.logger';
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './board.service';

const router = express.Router();

router
  .route('/')
  .get(async (_req, res, next) => {
    try {
      const boards = await getAll();
      if (boards) {
        logResponse(res);
        res.json(boards);
      } else {
        throw new ErrorHandler(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
      }
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { columns, title } = req.body;
      const columnsValid = !columns || (Array.isArray(columns) && columns.every((column: {[key: string]: string}) => !!column['title']));
      if (!title || !columnsValid){
        throw new ErrorHandler(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST);
      }
      const board = await createOne(req.body);
      res.status(StatusCodes.CREATED);
      logResponse(res);
      res.json(board);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/:boardId')
  .get(async (req, res, next) => {
    try {
      const board = await getOne(req.params.boardId);
      if (board) {
        logResponse(res); 
        res.json(board);
      } else {
        throw new ErrorHandler(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)
      }
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const {title, columns} = req.body;
      const boardValid = title || (columns && Array.isArray(columns));
      const columnsValid = !columns || 
      (Array.isArray(columns) && columns.every((column: {[key: string]: string}) => column['title'] && typeof column['order'] === 'number'));
      if (!boardValid || !columnsValid) {
        throw new ErrorHandler(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST);
      }
      const board = await updateOne(req.params.boardId, req.body);
      if (!board) {
        throw new ErrorHandler(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
      }
      logResponse(res);
      res.json(board);
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const isDeleted = await deleteOne(req.params.boardId);
      if (isDeleted) {
        res.status(StatusCodes.NO_CONTENT);
        logResponse(res);
        res.send('Board has been deleted');
      } else {
        throw new ErrorHandler(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
      }
    } catch (error) {
      next(error);
    }
  });

export default router;
