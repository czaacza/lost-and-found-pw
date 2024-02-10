import React from 'react';

const FileUpload = ({ onChange }) => {
  return (
    <div className="mt-4">
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        aria-describedby="file_input_help"
        id="file_input"
        type="file"
        onChange={onChange} // Use the passed onChange function
        multiple // Optional, if you want to allow uploading multiple files
      />
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300 mb-0">
        SVG, PNG, JPG, or GIF (MAX. 800x400px).
      </p>
    </div>
  );
};

export default FileUpload;
