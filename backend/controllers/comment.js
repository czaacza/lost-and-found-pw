const commentSchema = require('../models/CommentModel');
const postSchema = require('../models/PostModel');

exports.addComment = async (req, res) => {
  try {
    const { userId, postId, text, date, likes } = req.body;
    const comment = new commentSchema({
      userId,
      postId,
      text,
      date,
      likes,
    });
    if (!text) {
      return res.status(400).json({ message: 'Comment cannot be empty' });
    }
    if (!userId || !postId || !text || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (text.length > 2000) {
      return res
        .status(400)
        .json({ message: 'Comment cannot exceed 2000 characters' });
    }

    const post = await postSchema.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push(comment._id);

    await post.save();
    await comment.save();

    res.status(201).json({ message: 'Comment added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await commentSchema.find().sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCommentsByPostId = async (req, res) => {
  try {
    const comments = await commentSchema.find({ postId: req.params.id });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getComment = async (req, res) => {
  try {
    const comment = await commentSchema.findById(req.params.id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await commentSchema.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await comment.deleteOne();

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
