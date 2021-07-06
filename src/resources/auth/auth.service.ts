import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { User } from '../users/user.entity';
import { getOneByLogin } from '../users/user.service';
import { jwtCreate } from '../../jwt/jwt';
import { ErrorHandler } from '../../errors/error';

export const createJWT = async (user: Pick<User, 'id' | 'login'>): Promise<string> => {
  const payload = {
    userId: user.id,
    login: user.login
  };
  const token = await jwtCreate(payload);
  return token;
};

export const authenticate = async (user: Pick<User, 'login' | 'password'>): Promise<string> => {
  const foundUser = await getOneByLogin(user.login);
  if (!foundUser) {
    throw new ErrorHandler(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN);
  }
  const userMatch = await foundUser.comparePassword(user.password);
  if (!userMatch) {
    throw new ErrorHandler(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN);
  }
  return createJWT(foundUser);
};



