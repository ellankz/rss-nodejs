import { users } from '../../dbMock/db.js';

const getAll = async () => Object.values(users);

const getOne = async (id) => {
  if (users[id]) {
    return users[id];
  }
  return null;
};

const createOne = async (user) => {
  if (!users[user.id]) {
    users[user.id] = user;
    return user;
  }
  return null;
};

const updateOne = async (user) => {
  if (users[user.id]) {
    users[user.id] = user;
    return user;
  }
  return null;
};

const deleteOne = async (id) => {
  if (users[id]) {
    delete users[id];
    return true;
  }
  return null;
};

export default { getAll, getOne, createOne, updateOne, deleteOne };
