import tasksRepo from './task.memory.repository.js';
import Task from './task.model.js';

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
export const getAll = (boardId) => tasksRepo.getAll(boardId);

/** Get one task by id
 * @param {string} boardId
 * @param {string} taskId
 * @return {Task} Task
 */
export const getOne = (boardId, taskId) => tasksRepo.getOne(boardId, taskId);

/** Create one task
 * @param {string} boardId
 * @param {Task} taskData
 * @return {Task|null} Task
 */
export const createOne = async (boardId, taskData) => {
  const res = await tasksRepo.createOne(
    boardId,
    new Task({ ...taskData, boardId })
  );
  return res;
};

/** Update one task
 * @param {string} boardId
 * @param {string} taskId
 * @param {Task} taskData
 * @return {Task|null} Task
 */
export const updateOne = async (boardId, taskId, taskData) => {
  const task = await getOne(boardId, taskId);
  const props = Object.getOwnPropertyNames(task);
  props.forEach((prop) => {
    if (prop !== 'id' && !!taskData[prop]) {
      task[prop] = taskData[prop];
    }
  });
  return tasksRepo.updateOne(boardId, task);
};

/** Delete one task
 * @param {string} boardId
 * @param {string} taskId
 * @return {boolean|null} Task
 */
export const deleteOne = (boardId, taskId) =>
  tasksRepo.deleteOne(boardId, taskId);

/** Delete all tasks in board
 * @param {string} boardId
 * @return {boolean|null} result
 */
export const deleteAll = (boardId) => tasksRepo.deleteAll(boardId);

/** Delete user from tasks
 * @param {string} userId
 */
export const deleteUser = (userId) => tasksRepo.deleteUser(userId);
