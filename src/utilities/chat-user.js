const users = [];

const addUser = ({ id, username, room }) => {
  if (!room) return { error: 'Chat room name is required' };

  const user = { id, username, room };
  users.push(user);

  return user;
};

const removeUser = (id) => {
  const indexToRemove = users.findIndex((user) => user.id === id);
  if (indexToRemove !== -1) {
    return users.splice(indexToRemove, 1)[0];
  }
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const getUserInRoom = (room) => {
  return users.filter((user) => user.room === room);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUserInRoom,
};
