const users = {
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

const getAll = async () => Object.values(users);

const getOne = async (id) => {
  if (users[id]) {
    return users[id];
  }
  return null;
};

const createOne = async (user) => {
  if (!users[user.id]) {
    users[user.id] = user;
    return user;
  }
  return null;
};

const updateOne = async (user) => {
  if (users[user.id]) {
    users[user.id] = user;
    return user;
  }
  return null;
};

const deleteOne = async (id) => {
  if (users[id]) {
    delete users[id];
    return true;
  }
  return null;
};

export default { getAll, getOne, createOne, updateOne, deleteOne };
