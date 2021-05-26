import { users } from '../../dbMock/db';
import User from './user.model';

const getAll = async () => Object.values(users);

const getOne = async (id: string) => {
  if (users[id]) {
    return users[id];
  }
  return null;
};

const createOne = async (user: User) => {
  if (!users[user.id]) {
    users[user.id] = user;
    return user;
  }
  return null;
};

const updateOne = async (user: User) => {
  if (users[user.id]) {
    users[user.id] = user;
    return user;
  }
  return null;
};

const deleteOne = async (id: string) => {
  if (users[id]) {
    delete users[id];
    return true;
  }
  return null;
};

export default {
  getAll, getOne, createOne, updateOne, deleteOne,
};
