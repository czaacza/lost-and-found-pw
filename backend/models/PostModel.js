const mongoose = require('mongoose');
const CommentSchema = require('./CommentModel');

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxLength: 50,
      trim: true,
      default: 'item',
    },
    text: {
      type: String,
      required: true,
      maxLength: 2000,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    photos: {
      type: Array,
      default: [],
    },
    tags: {
      type: Array,
      default: [],
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
      default: [],
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: false,
      },
      coordinates: {
        type: [Number],
        required: false,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
