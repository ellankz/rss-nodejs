import usersRepo from './user.memory.repository.js';
import User from './user.model.js';

export const getAll = () => usersRepo.getAll();

export const getOne = (userId) => usersRepo.getOne(userId);

export const createOne = (userData) => usersRepo.createOne(new User(userData));

export const updateOne = async (userId, userData) => {
  const user = await getOne(userId);
  const props = Object.getOwnPropertyNames(user);
  props.forEach((prop) => {
    if (prop !== 'id' && !!userData[prop]) {
      user[prop] = userData[prop];
    }
  });
  return usersRepo.updateOne(user);
};

export const deleteOne = (userId) => usersRepo.deleteOne(userId);
