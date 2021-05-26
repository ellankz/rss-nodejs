import { deleteUser } from '../tasks/task.service';
import usersRepo from './user.memory.repository';
import User from './user.model';

export const getAll = () => usersRepo.getAll();

export const getOne = (userId: string) => usersRepo.getOne(userId);

export const createOne = (userData: Partial<User>) => usersRepo.createOne(new User(userData));

export const updateOne = async (userId: string, userData: Partial<User>) => {
  const user = await getOne(userId);
  const newUser = new User({...user, ...userData, id: userId});
  return usersRepo.updateOne(newUser);
};

export const deleteOne = async (userId: string) => {
  await deleteUser(userId);
  return usersRepo.deleteOne(userId);
};
