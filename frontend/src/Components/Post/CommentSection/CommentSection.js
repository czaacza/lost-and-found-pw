import React, { useState } from 'react';
import Comment from './Comment';
import CommentComposer from './CommentComposer';

const CommentSection = ({ comments, postId }) => {
  const [replyTo, setReplyTo] = useState(null);

  const handleReply = (username) => {
    console.log(`Replying to ${username}`);
    setReplyTo(username);
  };

  return (
    <div>
      <div className="bg-white p-1  rounded-lg space-y-4">
        {comments.map((comment, index) => (
          <div className="my-0">
            <Comment
              key={index}
              username={comment.userId.username}
              profilePic={comment.userId.image}
              date={comment.date}
              content={comment.text}
              onReply={() => handleReply(comment.userId.username)}
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
