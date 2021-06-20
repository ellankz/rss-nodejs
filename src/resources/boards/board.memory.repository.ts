import { getRepository } from "typeorm";
import { Board } from "../../entities/Board";
import { Column } from "../../entities/Column";

const getAll = async (): Promise<Board[]> => {
  const repository = getRepository(Board);
  return repository.find({ relations: ["columns"] });
};

const getOne = async (id: string): Promise<Board | undefined>  => {
  const repository = getRepository(Board);
  return repository.findOne(id, { relations: ["columns"] });
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
  return boardRepository.findOne(newBoard.id, { relations: ["columns"] });
};

const updateOne = async (boardId: string, boardData: Partial<Board>): Promise<Board | undefined> => {
  const boardRepository = getRepository(Board);
  const columnRepository = getRepository(Column);
  const oldBoard = await boardRepository.findOne(boardId, { relations: ["columns"] });
  const { columns, title } = boardData;
  let newCols: Column[] = [];
  if (columns) {
    oldBoard?.columns?.forEach(async (col) => {
      await columnRepository.delete(col.id);
    });
    newCols = await Promise.all(columns.map(async (col) => {
      const newCol = columnRepository.create(col);
      await columnRepository.save(newCol);
      return newCol;
    }));
  }
  if (title) {
    const board = await boardRepository.findOne(boardId, { relations: ["columns"] });
    if (board) {
      await boardRepository.update(boardId, {title});
    }
  }
  const board = await boardRepository.findOne(boardId, { relations: ["columns"] });
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
