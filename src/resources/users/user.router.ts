import express from 'express';
import User from './user.model';
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
  .get(async (_req, res) => {
    const users = await getAll();
    res.json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const user = await createOne(req.body);
    if (user) {
      res.status(201);
      res.json(User.toResponse(user));
    } else {
      // TODO: handle error here
    }
  });

router
  .route('/:userId')
  .get(async (req, res) => {
    const user = await getOne(req.params.userId);
    if (user) {
      res.json(User.toResponse(user));
    } else {
      // TODO: handle error here
    }
  })
  .put(async (req, res) => {
    const user = await updateOne(req.params.userId, req.body);
    if (user) {
      res.json(User.toResponse(user));
    } else {
      // TODO: handle error here
    }
  })
  .delete(async (req, res) => {
    const isDeleted = await deleteOne(req.params.userId);
    if (isDeleted) {
      res.status(204).json({ Error: 'User has been deleted' });
    } else {
      res.status(404).json({ Error: 'User not found' });
    }
  });

export default router;
