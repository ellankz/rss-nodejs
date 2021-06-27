import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getRepository } from "typeorm";
import { ErrorHandler } from "../../errors/error";
import { User } from "./user.entity";


const getAll = async (): Promise<User[]> => {
  const repository = getRepository(User);
  return repository.find();
};

const getOneById = async (id: string): Promise<User|undefined> => {
  const repository = getRepository(User);
  return repository.findOne(id);
}

const getOneByLogin = async (login: string): Promise<User|undefined> => {
  const repository = getRepository(User);
  return repository.findOne({ where: { login }});
}

const createOne = async (userData: Partial<User>): Promise<User> => {
  const repository = getRepository(User);
  const existingUser = await repository.findOne({ where: { login: userData.login }});
  if (existingUser) {
    throw new ErrorHandler(StatusCodes.CONFLICT, ReasonPhrases.CONFLICT);
  }
  const newUser = repository.create(userData);
  return repository.save(newUser);
};

const updateOne = async (userId: string, userData: Partial<User>): Promise<User|undefined> => {
  const repository = getRepository(User);
  const user = await repository.findOne(userId);
  if (user) {
    const updateRes = await repository.update(userId, userData)
    return updateRes.raw;
  }
  return undefined;
};

const deleteOne = async (id: string): Promise<true|undefined> => {
  const repository = getRepository(User);
  const deleteRes = await repository.delete(id);
  if (deleteRes.affected) {
    return true;
  }
  return undefined;
};

export default {
  getAll, getOneById, getOneByLogin, createOne, updateOne, deleteOne,
};
