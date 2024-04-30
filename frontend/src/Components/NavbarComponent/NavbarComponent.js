import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../img/lf-logo-pw.png'; // Replace with the actual path to your logo
import logo_dark from'../../img/lf-logo-pw-dark.png';
import './NavbarComponent.css';
import avatar from '../../img/avatar-placeholder.png';
import { useNavigate } from 'react-router-dom';

// Profile Dropdown
const ProfileDropDown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuState, setMenuState] = useState(false);

  const profileRef = useRef();
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const navigation = [
    { title: 'Profile', path: '/profile' },
    { title: 'Settings', path: 'javascript:void(0)' },
  ];

  const handleSubmitLogout = () => {
    handleLogout();
    navigate('/');
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative ${props.class}`} ref={profileRef}>
      <div className="flex items-center space-x-4">
        <button
          className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 focus:ring-[#6A1515]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src={user && user.image ? user.image : avatar}
            alt={user ? user.displayName : 'User'}
            className="w-full h-full rounded-full"
          />
        </button>
      </div>
      {isOpen && (
        <ul className="absolute bg-white mt-2 py-1 w-48 border rounded-md shadow-lg right-0 profile-dropdown">
          {navigation.map((item, idx) => (
            <li key={idx}>
              <a
                href={item.path}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {item.title}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={handleSubmitLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Log out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

const NavbarComponent = () => {
  const { user, loading } = useAuth(); // Use the 'user' to check if someone is logged in
  const [menuState, setMenuState] = useState(false);

  // Replace javascript:void(0) path with your path
  const navigation = [
    { title: 'Home', path: '/' },
    { title: 'Map', path: '/map' },
  ];
  return (
    <nav className="border-b dark:bg-neutral-800">
      <div className="flex items-center space-x-8 py-3 px-4 max-w-screen-xl mx-auto md:px-8">
        <div className="flex-none lg:flex-initial">
          <a href="/">
            <img src={logo_dark} width={150} height={50} alt="logo" />
          </a>
        </div>
        <div className="flex-1 flex items-center justify-between">
          <div
            className={`bg-[#FFFFFF] dark:bg-neutral-800 absolute z-20 w-5/6 top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${
              menuState ? '' : 'hidden'
            }`}
          >
            <ul className="mt-12 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0 nav-items">
              {navigation.map((item, idx) => (
                <li
                  key={idx}
                  className="text-gray-900 dark:text-neutral-50 hover:text-gray-900 font-normal"
                >
                  <a href={item.path}>{item.title}</a>
                </li>
              ))}
              {user && !loading && (
                <li className="text-gray-900 dark:text-neutral-50 hover:text-gray-900 ">
                  <a href="/profile" className="font-normal">
                    Profile
                  </a>
                </li>
              )}
              {!user && !loading && (
                <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
                  <a
                    href="/login"
                    className="block text-gray-900 dark:text-neutral-50"
                  >
                    <span className="dark:text-neutral-50">Log in</span>
                  </a>
                  <a
                    href="/signup"
                    className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-red-800 hover:bg-[#6A1515] active:bg-[#6A1515] rounded-full md:inline-flex"
                  >
                    Sign up
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </ul>

            {user && <ProfileDropDown class="mt-5 pt-5 border-t lg:hidden" />}
          </div>
          <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
            {/* <form className="flex items-center space-x-2 border rounded-md p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 flex-none text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                className="w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto"
                type="text"
                placeholder="Search"
              />
            </form> */}
            {user && <ProfileDropDown class="hidden lg:block" />}
            <button
              className="outline-none text-gray-400 block lg:hidden"
              onClick={() => setMenuState(!menuState)}
            >
              {menuState ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
