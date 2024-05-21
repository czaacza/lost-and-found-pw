import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../context/AuthContext';
import avatar from '../../../img/avatar-placeholder.png';
import { useGlobalContext } from '../../../context/GlobalContext';
import { useTranslation } from 'react-i18next';

const Comment = ({
  id,
  username,
  profilePic,
  date,
  content,
  onReply,
  onRemove,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useAuth();
  const { removeComment } = useGlobalContext();
  const { t } = useTranslation();

  const handleRemove = async () => {
    try {
      await removeComment(id);
      onRemove(id); // Call the passed function to filter out this comment from the parent component's state
    } catch (error) {
      console.error('Error removing comment:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="p-2 pd-0 rounded-lg relative">
      <div className="flex items-start space-x-3">
        <img
          src={profilePic ? profilePic : avatar}
          alt={`${username}'s profile pic`}
          className="w-8 h-8 rounded-full object-cover mt-1"
        />
        <div className="flex-1 bg-gray-200 dark:bg-gray-500 p-3 rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-3">
              <h5 className="font-semibold text-sm leading-tight dark:text-neutral-300">
                {username}
              </h5>
              <span className="text-xs text-gray-500 dark:text-gray-300">{date}</span>
            </div>
            {user && user.username === username && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleDropdown}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                >
                  <FontAwesomeIcon icon={faEllipsisH} className="text-sm" />
                </button>
              </div>
            )}
          </div>
          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute right-4 top-4 w-24 bg-white rounded-md shadow-lg z-10"
            >
              <ul className="text-gray-700 text-sm">
                <li
                  className="hover:bg-gray-100 p-2 cursor-pointer"
                  onClick={handleRemove}
                >
                  {t('Remove')}
                </li>
              </ul>
            </div>
          )}
          <p className="text-gray-800 dark:text-neutral-50 text-sm mb-2 leading-snug">{content}</p>
          <button
            onClick={onReply}
            className="flex items-center text-blue-500 dark:text-blue-900 text-xs hover:underline"
          >
            <FontAwesomeIcon icon={faReply} className="text-xs mr-1" />
            {t('Reply')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
