import usersRepo from './user.repository';
import { User } from './user.entity';

export const getAll = (): Promise<User[]> => usersRepo.getAll();

export const getOneById = (userId: string): Promise<User|undefined> => usersRepo.getOneById(userId);

export const getOneByLogin = (login: string): Promise<User|undefined> => usersRepo.getOneByLogin(login);

export const createOne = (userData: Partial<User>): Promise<User> => usersRepo.createOne(userData);

export const updateOne = async (userId: string, userData: Partial<User>): Promise<User|undefined> => usersRepo.updateOne(userId, userData);

export const deleteOne = async (userId: string):Promise<true|undefined> => usersRepo.deleteOne(userId);
