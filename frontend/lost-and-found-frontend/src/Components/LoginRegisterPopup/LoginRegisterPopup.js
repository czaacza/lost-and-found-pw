import React, { useState } from 'react';
import LoginForm from '../Forms/LoginForm'; // Adjust path as needed
import RegisterForm from '../Forms/RegisterForm'; // Adjust path as needed
import './LoginRegisterPopup.css'; // Ensure you have this for styling
import '../Forms/Forms.css'; // Ensure you have this for styling

const LoginRegisterPopup = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleView = () => setIsLogin(!isLogin);

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-button">×</button>
        <div className="popup-content">
          {isLogin ? (
            <>
              <LoginForm onLogin /> {/* Pass onLogin to LoginForm */}
              <p className="toggle-form">
                Don't have an account?{' '}
                <span onClick={toggleView}>Register</span>
              </p>
            </>
          ) : (
            <>
              <RegisterForm setIsLogin={setIsLogin} />
              <p className="toggle-form">
                Already have an account? <span onClick={toggleView}>Login</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPopup;
