import { getUserByEmail, createUser } from '../models/user.model.js';

const loginUser = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) return null;
  if (user.password !== password) return null;
  return user;
};

const registerUser = async (userData) => {
  const exists = await getUserByEmail(userData.email);
  if (exists) return null;
  return await createUser(userData);
};

const findUserByEmail = getUserByEmail;

const authService = {
  loginUser,
  registerUser,
  findUserByEmail
};

export default authService;
