import React, { useState } from 'react';
import logo from '../../img/lf-logo-pw-light.png';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const { handleLogin } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await handleLogin(username, password);

      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <div className="text-center pb-8">
          <img src={logo} width={150} className="mx-auto" alt="Logo" />
          <div className="mt-5">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
          </div>
        </div>
        {/* Show error message if login fails */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-medium">Username</label>
            <input
              type="text"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-x-3">
              {/* Remember me checkbox and forgot password link */}
            </div>
            <a
              href="/forgot-password"
              className="text-center text-[#6A1515] hover:text-[#6A1515]"
            >
              Forgot password?
            </a>
          </div>
          <button className="w-full px-4 py-2 text-white font-medium bg-[#6A1515] hover:bg-[#551111] active:bg-[#551111] rounded-lg duration-150">
            Sign in
          </button>
        </form>
        <button className="w-full px-4 py-2 text-[#1c1c1c] font-medium bg-gray-100 hover:bg-gray-300 active:bg-gray-300 rounded-full duration-150 border-2 border-gray-600">
          Sign in using USOS
        </button>
      </div>
    </main>
  );
};

export default LoginComponent;
