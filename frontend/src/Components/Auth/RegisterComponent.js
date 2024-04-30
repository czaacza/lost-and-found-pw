import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Adjust the import path as necessary
import logo from '../../img/lf-logo-pw-light.png'; // Adjust the import path for your logo
import logo_dark from '../../img/lf-logo-pw-dark.png';
import { useNavigate } from 'react-router-dom';

const RegisterComponent = () => {
  const { handleRegister } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any existing errors

    try {
      await handleRegister(name, email, password);
      // Registration successful, you can redirect or clear form here
      setName('');
      setEmail('');
      setPassword('');
      // If you have routing, you might want to redirect the user to the login page or dashboard here
      navigate('/login');
    } catch (error) {
      setError(error.message); // Set error message from the exception
    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-neutral-900 sm:px-4">
      <div className="w-full space-y-6 text-gray-600 dark:text-neutral-400 sm:max-w-md">
        <div className="text-center">
          <img src={logo_dark} width={150} className="mx-auto" alt="Logo" />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 dark:text-neutral-50 text-2xl font-bold sm:text-3xl">
              Create an account
            </h3>
            <p>
              Already have an account?{' '}
              <a
                href="/login" // Adjust the href to your login route
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
        {/* Display error message */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="bg-[#FFFFFF] dark:bg-neutral-800 dark:text-neutral-300 shadow p-4 py-6 sm:p-6 sm:rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-medium">Name</label>
              <input
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 dark:text-neutral-100  bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 dark:text-neutral-100 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 dark:text-neutral-100 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-[#6A1515] hover:bg-[#551111] active:bg-[#551111] rounded-lg duration-150"
            >
              Create account
            </button>
          </form>
          {/* Other buttons or links */}
        </div>
      </div>
    </main>
  );
};

export default RegisterComponent;
