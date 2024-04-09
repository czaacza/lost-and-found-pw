import React, { useState } from 'react';
import Comment from './Comment';
import CommentComposer from './CommentComposer';

const CommentSection = ({ comments: initialComments, postId }) => {
  const [comments, setComments] = useState(initialComments);
  const [replyTo, setReplyTo] = useState(null);

  const handleReply = (username) => {
    console.log(`Replying to ${username}`);
    setReplyTo(username);
  };

  const handleRemoveComment = (id) => {
    setComments(comments.filter((comment) => comment._id !== id));
  };

  return (
    <div>
      <div className="bg-white p-1  rounded-lg space-y-4">
        {comments.map((comment, index) => (
          <div key={comment._id} className="my-0">
            {' '}
            {/* Ensure each comment has a unique key */}
            <Comment
              id={comment._id}
              username={comment.userId.username}
              profilePic={comment.userId.image}
              date={comment.date}
              content={comment.text}
              onReply={() => handleReply(comment.userId.username)}
              onRemove={handleRemoveComment} // Pass the remove function as a prop
            />
          </div>
        ))}
      </div>
      <div className="separator mt-2 mb-2 mx-3"></div>
      <div>
        <CommentComposer postId={postId} setComments={() => {}} />
      </div>
    </div>
  );
};

export default CommentSection;
