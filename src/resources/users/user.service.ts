// import { deleteUser } from '../tasks/task.service';
import usersRepo from './user.memory.repository';
import { User } from '../../entities/User';

export const getAll = (): Promise<User[]> => usersRepo.getAll();

export const getOne = (userId: string): Promise<User|undefined> => usersRepo.getOne(userId);

export const createOne = (userData: Partial<User>): Promise<User> => usersRepo.createOne(userData);

export const updateOne = async (userId: string, userData: Partial<User>): Promise<User|undefined> => usersRepo.updateOne(userId, userData);

export const deleteOne = async (userId: string):Promise<true|undefined> => 
  // await deleteUser(userId);
   usersRepo.deleteOne(userId)
;
