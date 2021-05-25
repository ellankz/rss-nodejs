import { users } from '../../dbMock/db.js';

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
const getAll = async () => Object.values(users);

/** Get one user by id
 * @param {string} id
 * @return {User} User
 */
const getOne = async (id) => {
  if (users[id]) {
    return users[id];
  }
  return null;
};

/** Create one user
 * @param {User} user
 * @return {User|null} User
 */
const createOne = async (user) => {
  if (!users[user.id]) {
    users[user.id] = user;
    return user;
  }
  return null;
};

/** Update one user
 * @param {User} user
 * @return {User|null} User
 */
const updateOne = async (user) => {
  if (users[user.id]) {
    users[user.id] = user;
    return user;
  }
  return null;
};

/** Update one user
 * @param {string} id
 * @return {boolean|null} User
 */
const deleteOne = async (id) => {
  if (users[id]) {
    delete users[id];
    return true;
  }
  return null;
};

export default { getAll, getOne, createOne, updateOne, deleteOne };
