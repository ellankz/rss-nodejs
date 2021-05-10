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

const getOne = async (id) => users[id];

const createOne = async (userData) => {
  if (!users[userData.id]) {
    users[userData.id] = userData;
    return userData;
  }
  return null;
};

const updateOne = async (userData) => {
  if (users[userData.id]) {
    const updatedUser = { ...users[userData.id], ...userData };
    users[userData.id] = updatedUser;
    return updatedUser;
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
