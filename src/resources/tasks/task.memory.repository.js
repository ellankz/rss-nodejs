import { tasks } from '../../dbMock/db.js';

/**
 *
 * @typedef Task
 * @type {Object}
 * @property {string} id
 * @property {string} title
 * @property {number} order
 * @property {string} description
 * @property {string} userId
 * @property {string} boardId
 * @property {string} columnId
 */

/** Get all tasks
 * @return {Array.<Task>} All tasks
 */
const getAll = async (boardId) => Object.values(tasks[boardId]);

/** Get one task by id
 * @param {string} boardId
 * @param {string} taskId
 * @return {Task} Task
 */
const getOne = async (boardId, taskId) => {
  if (tasks[boardId] && tasks[boardId][taskId]) {
    return tasks[boardId][taskId];
  }
  return null;
};

/** Create one task
 * @param {string} boardId
 * @param {Task} task
 * @return {Task|null} Task
 */
const createOne = async (boardId, task) => {
  if (!tasks[boardId]) {
    tasks[boardId] = {};
  }
  if (!tasks[boardId][task.id]) {
    tasks[boardId][task.id] = task;
    return task;
  }
  return null;
};

/** Update one task
 * @param {string} boardId
 * @param {Task} task
 * @return {Task|null} Task
 */
const updateOne = async (boardId, task) => {
  if (tasks[boardId] && tasks[boardId][task.id]) {
    tasks[boardId][task.id] = task;
    return task;
  }
  return null;
};

/** Delete one task
 * @param {string} boardId
 * @param {string} taskId
 * @return {boolean|null} Task
 */
const deleteOne = async (boardId, taskId) => {
  if (tasks[boardId] && tasks[boardId][taskId]) {
    delete tasks[boardId][taskId];
    return true;
  }
  return null;
};

/** Delete all tasks in board
 * @param {string} boardId
 * @return {boolean|null} result
 */
const deleteAll = async (boardId) => {
  if (tasks[boardId]) {
    delete tasks[boardId];
    return true;
  }
  return null;
};

/** Delete user from tasks
 * @param {string} userId
 */
const deleteUser = (userId) => {
  Object.values(tasks).forEach((board) => {
    Object.values(board).forEach((paramTask) => {
      const task = paramTask;
      if (task.userId === userId) {
        task.userId = null;
      }
    });
  });
};

export default {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  deleteAll,
  deleteUser,
};
