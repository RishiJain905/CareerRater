import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Message from './components/Message';

function App() {
  const [currentForm, setCurrentForm] = useState('login'); // 'login' or 'signup'
  const [message, setMessage] = useState({ text: '', type: '' });

  const switchToSignup = () => {
    setCurrentForm('signup');
    setMessage({ text: '', type: '' });
  };

  const switchToLogin = () => {
    setCurrentForm('login');
    setMessage({ text: '', type: '' });
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    // Auto-clear message after 5 seconds
    setTimeout(() => {
      setMessage({ text: '', type: '' });
    }, 5000);
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-5">
      <div className="flex bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full min-h-[600px]">
        {/* Left side - Image placeholder */}
        <div className="flex-1 bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center relative">
          {/* Add your image here */}
          <img 
            src="" 
            alt="Login illustration" 
            className="max-w-full max-h-full object-cover hidden"
            onLoad={(e) => e.target.classList.remove('hidden')}
          />
          <div className="text-center text-white p-10">
            <p className="text-xl font-semibold mb-2">Add your image here</p>
            <small className="opacity-80">Replace the src attribute in the img tag above</small>
          </div>
        </div>

        {/* Right side - Forms */}
        <div className="flex-1 p-12 flex flex-col justify-center relative">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">CareerRater</h1>
            <p className="text-gray-600">Welcome back! Please sign in to your account</p>
          </div>

          {/* Message Display */}
          {message.text && (
            <Message message={message.text} type={message.type} />
          )}

          {/* Forms */}
          {currentForm === 'login' ? (
            <LoginForm 
              onSwitchToSignup={switchToSignup}
              onShowMessage={showMessage}
            />
          ) : (
            <SignupForm 
              onSwitchToLogin={switchToLogin}
              onShowMessage={showMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
