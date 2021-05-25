import express from 'express';
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './task.service.js';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(async (req, res) => {
    const tasks = await getAll(req.params.boardId);
    if (tasks) {
      res.json(tasks);
    } else {
      res.status(404);
      res.json('Not found.');
    }
  })
  .post(async (req, res) => {
    const task = await createOne(req.params.boardId, req.body);
    res.status(201);
    res.json(task);
  });

router
  .route('/:taskId')
  .get(async (req, res) => {
    const task = await getOne(req.params.boardId, req.params.taskId);
    if (task) {
      res.json(task);
    } else {
      res.status(404);
      res.json('Not found.');
    }
  })
  .put(async (req, res) => {
    const task = await updateOne(
      req.params.boardId,
      req.params.taskId,
      req.body
    );
    res.json(task);
  })
  .delete(async (req, res) => {
    const isDeleted = await deleteOne(req.params.boardId, req.params.taskId);
    if (isDeleted) {
      res.status(204).json({ Error: 'Task has been deleted' });
    } else {
      res.status(404).json({ Error: 'Not found' });
    }
  });

export default router;
