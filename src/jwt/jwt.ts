import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { ErrorHandler } from '../errors/error';

const secret = process.env['JWT_SECRET_KEY'];

export const jwtCreate = async (payload: {userId: string, login: string}): Promise<string> => {
  if (secret) {
    const options = {
      expiresIn: '7d'
    };
  
    const sign = (): Promise<string> => new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, (err, token) => {
          if (err || !token) {
            return reject(err);
          }
          return resolve(token);
        });
      })
  
    const token = await sign();
    return token;
  }
  throw new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR);
};

export const checkJWT = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  try {
      if (secret) {
        const authHeader = req.header('Authorization');
        if (  authHeader && authHeader.startsWith('Bearer ') ) {
          const tokenReceived = authHeader.substring(7);
          const verify = () => new Promise((resolve, reject) => {
            jwt.verify(tokenReceived, secret, (err, decoded) => {
              if (err || !decoded) {
                return reject(err);
              } 
              return resolve(decoded);
            });
          });
          await verify();
          next();
        } else {
          throw new ErrorHandler(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
        }
      } else {
        throw new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR);
      }
    } catch (err) {
      next(err);
    }
};
