import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const RegisterForm = (setIsLogin) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { handleRegister } = useAuth();

  const onRegisterPress = async () => {
    try {
      await handleRegister(username, email, password);
      setIsLogin(true); // Switch to login screen
    } catch (e) {}
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('handleSubmit');
    onRegisterPress();
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Register</h2>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
