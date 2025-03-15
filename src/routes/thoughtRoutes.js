const router = require('express').Router();
const { getThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../controllers/thoughtController');
userRouter.route('/').get(getThoughts).post(createThought);
userRouter.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);
userRouter.route('/:thoughtId/reactions').post(addReaction);
userRouter.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
module.exports = userRouter;
