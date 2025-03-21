const userRouter = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

userRouter.route('/').get(getUsers).post(createUser);
userRouter.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

module.exports = userRouter;