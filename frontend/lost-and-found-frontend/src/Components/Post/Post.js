// Post.js

import React from 'react';
import './Post.css'; // Make sure to create a Post.css file for styling
import profilePic from '../../img/avatar-placeholder.png';
import boots from '../../img/boots.jpg';

function Post({ post }) {
  // Dummy data for the example, you would replace this with actual props or state
  const postInfo = {
    author: post.userId.username,
    tags: post.tags,
    date: post.createdAt.slice(0, 10),
    time: post.createdAt.slice(11, 16),
    description: post.text || '',
    imageUrl: '../../img/boots.jpg',
  };

  const comments = [
    { author: 'John Doe', text: 'Buty bardzo ładne' },
    { author: 'William Beck', text: 'Faktycznie widziałem cię w nich' },
  ];

  return (
    <div className="post">
      <div className="post-header">
        <img src={profilePic} alt="Profile" className="post-profile-pic" />
        <div className="post-info">
          <div className="author">{postInfo.author}</div>
          <div className="tags">
            {postInfo.tags.map((tag) => (
              <span className="badge rounded-pill bg-secondary tag">{tag}</span>
            ))}
          </div>
          <div className="date">{postInfo.date}</div>
          <div className="time">{postInfo.time}</div>
        </div>
      </div>
      <p className="description">{postInfo.description}</p>
      <img src={boots} alt="Lost Item" className="item-image" />
      <div className="comments-section">
        {comments.map((comment) => (
          <div className="comment">
            <img src={profilePic} alt="Profile" className="profile-pic" />
            <div className="comment-info">
              <div className="author">{comment.author}</div>
              <div className="text">{comment.text}</div>
            </div>
          </div>
        ))}
        <input
          type="text"
          className="form-control comment-input"
          placeholder="Write a comment"
        />
      </div>
    </div>
  );
}

export default Post;
