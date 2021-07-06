import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { authenticate } from './auth.service';
import { ErrorHandler } from '../../errors/error';

const router = express.Router();

router.route('/').post(async (req, res, next) => {
  try {
    const token = await authenticate(req.body);
    if (token) {
      res.status(200).json({token});
    } else {
      throw new ErrorHandler(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    }
  } catch (err) {
    next(err);
    
  }
});

export default router;
