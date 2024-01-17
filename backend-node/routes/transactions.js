const {
  login,
  addUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require('../controllers/user');

const {
  addPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
  getPostByUserId,
} = require('../controllers/post');

const router = require('express').Router();

router
  .post('/users', addUser)
  .get('/users', getUsers)
  .delete('/users/:id', deleteUser)
  .get('/users/:id', getUser)
  .put('/users/:id', updateUser);

router.post('/login', login);

router
  .post('/posts', addPost)
  .get('/posts', getPosts)
  .delete('/posts/:id', deletePost)
  .get('/posts/:id', getPost)
  .put('/posts/:id', updatePost)
  .get('/posts/user/:userId', getPostByUserId);

module.exports = router;
