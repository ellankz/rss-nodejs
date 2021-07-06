import { getRepository } from "typeorm";
import { Board } from "./board.entity";
import { Column } from "./column.entity";

const getAll = async (): Promise<Board[]> => {
  const repository = getRepository(Board);
  return repository.find({ relations: ["columns"] });
};

const getOne = async (id: string): Promise<Board | undefined>  => {
  const repository = getRepository(Board);
  return  repository.findOne(id, { relations: ["columns"] });
};

const createOne = async (boardData: Partial<Board>): Promise<Board | undefined> => {
  const boardRepository = getRepository(Board);
  const columnRepository = getRepository(Column);
  const { columns } = boardData;
  const newBoard = boardRepository.create(boardData);
  if (columns) {
    const newColumns = columns.map((col) => columnRepository.create({...col}));
    newBoard.columns = await columnRepository.save(newColumns);
  }
  await boardRepository.save(newBoard);
  return await boardRepository.findOne(newBoard.id, { relations: ["columns"] });
};

const updateOne = async (boardId: string, boardData: Partial<Board>): Promise<Board | undefined> => {
  const boardRepository = getRepository(Board);
  const columnRepository = getRepository(Column);
  const oldBoard = await boardRepository.findOne(boardId, { relations: ["columns"] });
  const { columns = [], title } = boardData;
  const deleteResults = oldBoard?.columns?.map((col) =>  columnRepository.delete(col.id));
  if (deleteResults) {
    await Promise.all(deleteResults);
  }
  const newCols = columns.map((col) => columnRepository.create(col));
  if (title) {
    const board = await boardRepository.findOne(boardId);
    if (board) {
      await boardRepository.update(boardId, {title});
    }
  }
  const board = await boardRepository.findOne(boardId);
  await columnRepository.save(newCols);
  if (board) {
    board.columns = newCols;
    return boardRepository.save(board);
  }
  return undefined;
};

const deleteOne = async (id: string): Promise<true | undefined> => {
  const repository = getRepository(Board);
  const deleteRes = await repository.delete(id);
  
  if (deleteRes.affected) {
    return true;
  }
  return undefined;
};

export default {
  getAll, getOne, createOne, updateOne, deleteOne,
};
