import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaRegCheckCircle } from 'react-icons/fa';

const SwitchButtons = ({ postType, setPostType }) => {
  const [isFoundChecked, setIsFoundChecked] = useState(false);

  useEffect(() => {
    if (postType === 'LOST') {
      setIsFoundChecked(false);
    } else {
      setIsFoundChecked(true);
    }
  }, [postType]);

  return (
    <>
      <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-grey-50 p-1">
        <input type="checkbox" className="sr-only" checked={isFoundChecked} />
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-md font-medium ${
            !isFoundChecked ? 'text-neutral-600 bg-gray-200 dark:text-neutral-50 dark:bg-gray-600' : 'text-body-color dark:text-slate-700'
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
            isFoundChecked ? 'text-neutral-600 bg-gray-200 dark:text-neutral-50 dark:bg-gray-600' : 'text-body-color dark:text-slate-700'
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
