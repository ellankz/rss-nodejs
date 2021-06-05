import { users } from '../../dbMock/db';
import User from './user.model';

const getAll = async (): Promise<User[]> => Object.values(users);

const getOne = async (id: string): Promise<User|null> => {
  const user = users[id];
  return user || null;
};

const createOne = async (user: User): Promise<User|null> => {
  if (!users[user.id]) {
    users[user.id] = user;
    return user;
  }
  return null;
};

const updateOne = async (user: User): Promise<User|null> => {
  if (users[user.id]) {
    users[user.id] = user;
    return user;
  }
  return null;
};

const deleteOne = async (id: string): Promise<true|null> => {
  if (users[id]) {
    delete users[id];
    return true;
  }
  return null;
};

export default {
  getAll, getOne, createOne, updateOne, deleteOne,
};
