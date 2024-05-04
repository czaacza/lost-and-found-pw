const PostSchema = require('../models/PostModel');

exports.addPost = async (req, res) => {
  try {
    const { userId, text, title, date, category, photos, tags, location } =
      req.body;
    const post = new PostSchema({
      userId,
      title,
      text,
      date,
      category,
      photos,
      tags,
      location,
    });
    if (!text) {
      return res.status(400).json({ message: 'Post cannot be empty' });
    }

    if (!userId || !text || !category || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    await post.save();
    res.status(201).json({ message: 'Post added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// populate the user field
exports.getPosts = async (req, res) => {
  try {
    const posts = await PostSchema.find()
      .populate('userId')
      .populate('comments')
      .populate({
        path: 'comments',
        populate: {
          path: 'userId',
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await PostSchema.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { text, date, category, photos, tags } = req.body;
    const post = await PostSchema.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.text = text;
    post.date = date;
    post.category = category;
    post.photos = photos;
    post.tags = tags;
    await post.save();
    res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await PostSchema.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    await post.deleteOne();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const post = await PostSchema.find({ userId })
      .populate('userId')
      .populate('comments')
      .populate({
        path: 'comments',
        populate: {
          path: 'userId',
        },
      })
      .sort({ createdAt: 1 });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostsSortedByOldest = async (req, res) => {
  try {
    const posts = await PostSchema.find()
      .populate('userId')
      .populate('comments')
      .populate({
        path: 'comments',
        populate: {
          path: 'userId',
        },
      })
      .sort({ createdAt: 1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostsSortedByMostComments = async (req, res) => {
  try {
    const posts = await PostSchema.find()
      .populate('userId')
      .populate('comments')
      .populate({
        path: 'comments',
        populate: {
          path: 'userId',
        },
      });

    posts.sort((a, b) => {
      return b.comments.length - a.comments.length;
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
