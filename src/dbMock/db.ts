import Board from '../resources/boards/board.model';
import Task from '../resources/tasks/task.model';
import User from '../resources/users/user.model';
import { DbData } from './db.types';

export const users: DbData<User> = {
  '56bcf12e-fccc-4c04-bc42-50f1b656654f': {
    id: '56bcf12e-fccc-4c04-bc42-50f1b656654f',
    name: 'Elena',
    login: 'ellankz',
    password: 'idkWhatDoYouThink55',
  },
  '8774283f-7e31-4e98-bed9-927d599fbb6c': {
    id: '8774283f-7e31-4e98-bed9-927d599fbb6c',
    name: 'Jonny',
    login: 'jonnyCash456',
    password: 'qwerty',
  },
};

export const boards: DbData<Board> = {
  '8d6fc546-335b-4bf2-b804-fdbe11120671': {
    id: '8d6fc546-335b-4bf2-b804-fdbe11120671',
    title: 'Board 1',
    columns: [
      {
        id: '81569839-bc38-463f-a004-1a2cd86f677c',
        title: 'Column 1 in Board 1',
        order: 0,
      },
    ],
  },
  'be3b90a2-badd-46de-889c-9c6eebda3446': {
    id: 'be3b90a2-badd-46de-889c-9c6eebda3446',
    title: 'Board 2',
    columns: [
      {
        id: 'f2c98ba3-568f-4378-85ed-a1d18480af3f',
        title: 'Column 1 in Board 2',
        order: 0,
      },
      {
        id: 'b78bb9e5-8edb-421b-a467-69f4a64fc872',
        title: 'Column 2 in Board 2',
        order: 0,
      },
    ],
  },
};

export const tasks: {[key: string]: DbData<Task>} = {
  'be3b90a2-badd-46de-889c-9c6eebda3446': {
    '0d66083f-7f7a-4073-906e-8169dbda63ab': {
      id: '0d66083f-7f7a-4073-906e-8169dbda63ab',
      title: 'Task from Board 2 Column 2',
      order: 0,
      description: 'This task is assigned to ellankz',
      userId: '56bcf12e-fccc-4c04-bc42-50f1b656654f',
      boardId: 'be3b90a2-badd-46de-889c-9c6eebda3446',
      columnId: 'b78bb9e5-8edb-421b-a467-69f4a64fc872',
    },
  },
};
