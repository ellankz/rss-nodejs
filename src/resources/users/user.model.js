import { v4 as uuid } from 'uuid';
/**
 * Class representing a user
/**
 *
 * @typedef User
 * @type {Object}
 * @property {string} id
 * @property {string} name
 * @property {string} login
 * @property {string} password
 */
/**
 *
 * @typedef UserForResponse
 * @type {Object}
 * @property {string} id
 * @property {string} name
 * @property {string} login
 */

class User {
  /**
   * Create a user.
   * @param {string} id - id
   * @param {string} name - name
   * @param {number} login - username
   * @param {string} password - password
   */
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Format user for response
   * @param {User} user - user data
   * @returns {UserForResponse} - user data for response
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
