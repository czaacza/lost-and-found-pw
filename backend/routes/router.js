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
  getPostsSortedByOldest,
  getPostsSortedByMostComments,
} = require('../controllers/post');

const {
  addComment,
  getComments,
  getComment,
  deleteComment,
  getCommentsByPostId,
} = require('../controllers/comment');

const router = require('express').Router();

// public access
router.post('/users', addUser);
router.post('/login', login);

router.get('/posts', getPosts);
router.get('/posts/user/:userId', getPostByUserId);
router.get('/posts/oldest', getPostsSortedByOldest);
router.get('/posts/most-comments', getPostsSortedByMostComments);
router.get('/posts/:id', getPost);

router.get('/comments/post/:postId', getCommentsByPostId);

// logged in user access
router.get('/user/profile', verifyToken, getUserProfile);
router.post('/logout', verifyToken, logout);
router.get('/users/:id', verifyToken, getUser);

router.post('/posts', verifyToken, addPost);
router.put('/posts/:id', verifyToken, updatePost);

router.post('/comments', verifyToken, addComment);

router.delete('/comments/:id', verifyToken, deleteComment);

// router.post('/check-email', checkEmailExists);
// router.post('/forgot-password', forgotPassword);
// router.patch('/reset-password/:token', resetPassword);

// only-admin access
router.get('/users', verifyToken, requireRole('admin'), getUsers);
router.delete('/users/:id', verifyToken, requireRole('admin'), deleteUser);
router.put('/users/:id', verifyToken, requireRole('admin'), updateUser);
router.get('/comments', verifyToken, requireRole('admin'), getComments);
router.get('/comments/:id', verifyToken, requireRole('admin'), getComment);

module.exports = router;
