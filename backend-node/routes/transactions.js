const verifyToken = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');

const {
  login,
  getUserProfile,
  addUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  logout,
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

// public access
router.post('/users', addUser);
router.post('/login', login);

// logged in user access
router.get('/users/:id', verifyToken, getUser);
router.get('/user/profile', verifyToken, getUserProfile);
router.post('/logout', verifyToken, logout);
// router.post('/check-email', checkEmailExists);
// router.post('/forgot-password', forgotPassword);
// router.patch('/reset-password/:token', resetPassword);

// only-admin access
router.get('/users', verifyToken, requireRole('admin'), getUsers);
router.delete('/users/:id', verifyToken, requireRole('admin'), deleteUser);
router.put('/users/:id', verifyToken, requireRole('admin'), updateUser);

router
  .post('/posts', addPost)
  .get('/posts', getPosts)
  .delete('/posts/:id', deletePost)
  .get('/posts/:id', getPost)
  .put('/posts/:id', updatePost)
  .get('/posts/user/:userId', getPostByUserId);

module.exports = router;
