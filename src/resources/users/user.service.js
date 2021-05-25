import { deleteUser } from '../tasks/task.service.js';
import usersRepo from './user.memory.repository.js';
import User from './user.model.js';

/**
 *
 * @typedef User
 * @type {Object}
 * @property {string} id
 * @property {string} name
 * @property {string} login
 * @property {string} password
 */

/** Get all users
 * @return {Array.<User>} All users
 */
export const getAll = () => usersRepo.getAll();

/** Get one user by id
 * @param {string} userId
 * @return {User} User
 */
export const getOne = (userId) => usersRepo.getOne(userId);

/** Create one user
 * @param {User} userData
 * @return {User|null} User
 */
export const createOne = (userData) => usersRepo.createOne(new User(userData));

/** Update one user
 * @param {string} userId
 * @param {User} userData
 * @return {User|null} User
 */
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

/** Update one user
 * @param {string} userId
 * @return {boolean|null} User
 */
export const deleteOne = async (userId) => {
  await deleteUser(userId);
  return usersRepo.deleteOne(userId);
};
