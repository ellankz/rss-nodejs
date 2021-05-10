import usersRepo from './user.memory.repository.js';

export const getAll = () => usersRepo.getAll();

export const getOne = () => usersRepo.getOne();

export const createOne = () => usersRepo.createOne();

export const updateOne = () => usersRepo.updateOne();

export const deleteOne = () => usersRepo.deleteOne();
