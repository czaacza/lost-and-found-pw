import React from 'react';
import logo from '../../img/lf-logo-pw.png';
import logo_dark from '../../img/lf-logo-pw-dark.png';

const Footer = () => {
  return (
    <footer className="p-4 md:p-8 lg:p-10 dark:bg-neutral-800">
      <div className="mx-auto max-w-screen-xl text-center">
        <a
          href="/"
          className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img src={logo} width={150} height={50} alt="logo" />
        </a>
        <p className="my-6 text-gray-500 dark:text-gray-400">
          Lost & Found service for the society of Warsaw University of
          Technology. Created by students for students.
        </p>
        <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              About us
            </a>
          </li>
          <li>
            <a
              href="https://github.com/czaacza/lost-and-found-pw"
              target="_blank"
              className="mr-4 hover:underline md:mr-6"
            >
              Github repo
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Contact
            </a>
          </li>
        </ul>
        <div className="text-sm text-gray-500 sm:text-center dark:text-gray-400 mt-3">
          © 2024, All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
