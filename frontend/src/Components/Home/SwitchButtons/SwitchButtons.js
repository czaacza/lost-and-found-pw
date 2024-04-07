import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaRegCheckCircle } from 'react-icons/fa';
import { useTranslation } from "react-i18next";

const SwitchButtons = ({ postType, setPostType }) => {
  const { t } = useTranslation();
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
            !isFoundChecked ? 'text-neutral-600 bg-gray-200' : 'text-body-color'
          }`}
          onClick={() => setPostType('LOST')}
        >
          <div className="icon-container fill-current">
            <FaSearch />
          </div>
          {t('Lost')}
        </span>
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-md font-medium ${
            isFoundChecked ? 'text-neutral-600 bg-gray-200' : 'text-body-color'
          }`}
          onClick={() => setPostType('FOUND')}
        >
          <div className="icon-container fill-current">
            <FaRegCheckCircle />
          </div>
          {t('Found')}
        </span>
      </label>
    </>
  );
};

export default SwitchButtons;
