import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdQuestionMark } from 'react-icons/md';
import { FaQuestion } from 'react-icons/fa6';
import { FaPersonCircleQuestion } from 'react-icons/fa6';
import { FaRegCheckCircle } from 'react-icons/fa';

const SwitchButtons = ({ postType, setPostType }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // if postype is lost, set isChecked to false
  // if postype is found, set isChecked to true

  useEffect(() => {
    if (postType === 'LOST') {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  }, [postType]);

  return (
    <>
      <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-grey-50 p-1">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-md font-medium ${
            !isChecked ? 'text-neutral-600 bg-gray-200' : 'text-body-color'
          }`}
          onClick={() => setPostType('LOST')}
        >
          <div className="icon-container fill-current">
            <FaSearch />
          </div>
          Lost
        </span>
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-md font-medium ${
            isChecked ? 'text-neutral-600 bg-gray-200' : 'text-body-color'
          }`}
          onClick={() => setPostType('FOUND')}
        >
          <div className="icon-container fill-current">
            <FaRegCheckCircle />
          </div>
          Found
        </span>
      </label>
    </>
  );
};

export default SwitchButtons;
