import {db} from '@/libs/prisma';

const createUser = async (data) => {
  return db.user.create({ data });
};

const existingUser = async (email) => {
  return db.user.findUnique({
    where: { email },
  });
}

const updateUser = async (id, data) => {
  return db.user.update({
    where: { id },
    data,
  });
};

const deleteUser = async (id) => {
  return db.user.delete({
    where: { id },
  });
};

const getOneUser = async (id) => {
  return db.user.findUnique({
    where: { id },
  });
};

const getAllUsers = async () => {
  return db.user.findMany();
};

const loginUser = async (data) => {
  return db.user.findFirst({ where: data });
};

export { createUser, updateUser, deleteUser, getOneUser, getAllUsers, existingUser, loginUser };
