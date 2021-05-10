import usersRepo from './user.memory.repository.js';

export const getAll = () => usersRepo.getAll();

export const getSingle = () => usersRepo.getSingle();
