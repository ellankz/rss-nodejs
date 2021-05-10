import express from 'express';
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './board.service.js';

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    const boards = await getAll();
    res.json(boards);
  })
  .post(async (req, res) => {
    const board = await createOne(req.body);
    res.status(201);
    res.json(board);
  });

router
  .route('/:boardId')
  .get(async (req, res) => {
    const board = await getOne(req.params.boardId);
    res.json(board);
  })
  .put(async (req, res) => {
    const board = await updateOne(req.params.boardId, req.body);
    res.json(board);
  })
  .delete(async (req, res) => {
    const isDeleted = await deleteOne(req.params.boardId);
    if (isDeleted) {
      res.status(204).json({ Error: 'Board has been deleted' });
    } else {
      res.status(404).json({ Error: 'Board not found' });
    }
  });

export default router;
