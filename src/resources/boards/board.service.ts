import { Board } from '../../entities/Board';
import boardsRepo from './board.memory.repository';
import { BoardBody } from './board.types';

export const getAll = (): Promise<Board[]> => boardsRepo.getAll();

export const getOne = (boardId: string): Promise<Board | undefined> => boardsRepo.getOne(boardId);

export const createOne = (boardData: BoardBody): Promise<Board | undefined> => boardsRepo.createOne(boardData);

export const updateOne = async (boardId: string, boardData: BoardBody): Promise<Board | undefined> => boardsRepo.updateOne(boardId, boardData);

export const deleteOne = async (boardId: string): Promise<true | undefined> => 
   boardsRepo.deleteOne(boardId)

;
