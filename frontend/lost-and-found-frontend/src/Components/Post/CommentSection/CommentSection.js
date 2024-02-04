import React, { useState } from 'react';
import Comment from './Comment';

const CommentSection = ({ comments }) => {
  const [replyTo, setReplyTo] = useState(null);

  const handleReply = (username) => {
    // Implement the reply functionality here
    // This could set a state that opens a reply input, for example
    console.log(`Replying to ${username}`);
    setReplyTo(username);
  };

  return (
    <div className="bg-white p-2  rounded-lg space-y-4">
      {comments.map((comment, index) => (
        <div className="my-0">
          <Comment
            key={index}
            username={comment.username}
            profilePic={comment.profilePic}
            date={comment.date}
            content={comment.content}
            onReply={() => handleReply(comment.username)}
          />
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
