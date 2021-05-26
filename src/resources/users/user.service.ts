import { deleteUser } from '../tasks/task.service';
import usersRepo from './user.memory.repository';
import User from './user.model';

export const getAll = (): Promise<User[]> => usersRepo.getAll();

export const getOne = (userId: string): Promise<User|null> => usersRepo.getOne(userId);

export const createOne = (userData: Partial<User>): Promise<User|null> => usersRepo.createOne(new User(userData));

export const updateOne = async (userId: string, userData: Partial<User>): Promise<User|null> => {
  const user = await getOne(userId);
  const newUser = new User({...user, ...userData, id: userId});
  return usersRepo.updateOne(newUser);
};

export const deleteOne = async (userId: string):Promise<true|null> => {
  await deleteUser(userId);
  return usersRepo.deleteOne(userId);
};
