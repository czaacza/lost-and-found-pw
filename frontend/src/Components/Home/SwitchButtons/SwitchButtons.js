import React, { useEffect, useState } from 'react';
import { FaSearch, FaRegCheckCircle } from 'react-icons/fa';
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
    <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-grey-50 p-1">
      <input
        type="checkbox"
        className="sr-only"
        checked={isFoundChecked}
        onChange={() => {}}
      />
      {/* Wrap each button in a flex container */}
      <div className="flex">
        {/* Button 1 */}
        <div
          className={`flex-1 flex items-center justify-center space-x-[6px] rounded py-2 px-[18px] text-md font-medium ${
            !isFoundChecked ? 'text-slate-100 bg-[#801919]' : 'text-body-color dark:text-slate-500'
          }`}
          onClick={() => setPostType('LOST')}
        >
          <FaSearch className="icon-container fill-current" />
          <span>{t('Lost')}</span>
        </div>
        {/* Button 2 */}
        <div
          className={`flex-1 flex items-center justify-center space-x-[6px] rounded py-2 px-[18px] text-md font-medium ${
            isFoundChecked ? 'text-slate-100 bg-[#801919]' : 'text-body-color dark:text-slate-500'
          }`}
          onClick={() => setPostType('FOUND')}
        >
          <FaRegCheckCircle className="icon-container fill-current" />
          <span>{t('Found')}</span>
        </div>
      </div>
    </label>
  );
};

export default SwitchButtons;
