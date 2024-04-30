import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import profilePic from '../../../img/avatar-placeholder.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faUserTag,
  faMapMarkerAlt,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import './CommentComposer.css';
import { useGlobalContext } from '../../../context/GlobalContext';
import { useAuth } from '../../../context/AuthContext';

const CommentComposer = ({ isSmall, postId }) => {
  const { user } = useAuth();
  const { addComment } = useGlobalContext();
  const [text, setText] = useState('');

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current && !isSmall) {
      textareaRef.current.focus({ preventScroll: true });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text) {
      const commentToAdd = {
        userId: user._id,
        postId: postId,
        text: text,
        date: new Date().toISOString(),
        likes: [],
      };
      try {
        await addComment(commentToAdd);
        setText('');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="pd-0 relative comment-composer">
      <form className="" onSubmit={handleSubmit}>
        <div className="flex items-start space-x-3">
          <div className="col-auto">
            <img
              src={profilePic}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover mt-1"
            />
          </div>
          <div className="col input-container bg-gray-200 dark:bg-gray-500 rounded-xl p-3 pt-2">
            <textarea
              ref={textareaRef}
              className="form-control input-field comment-composer-input bg-gray-200 dark:bg-gray-500 rounded-md"
              placeholder="Write a comment..."
              rows="3"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            {!isSmall && (
              <div className="comment-composer-button-row">
                <button type="submit" className="share-button text-xs">
                  <FontAwesomeIcon icon={faPaperPlane} />
                  <p>Comment</p>
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentComposer;
