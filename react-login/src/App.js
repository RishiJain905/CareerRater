import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import HomePage from './components/HomePage';
import CompanyDetail from './components/CompanyDetail';
import Message from './components/Message';

function App() {
  const [currentForm, setCurrentForm] = useState('login'); // 'login' or 'signup'
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Dummy user database (will be replaced with Supabase later)
  const [dummyUsers, setDummyUsers] = useState([
    { email: 'test@example.com', password: 'Test123', name: 'Test User' },
    { email: 'demo@careerRater.com', password: 'Demo123', name: 'Demo User' }
  ]);

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

  const handleLogin = (email, password) => {
    // Check if user exists in dummy database
    const user = dummyUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      showMessage('Login successful! Welcome back.', 'success');
      return true;
    } else {
      showMessage('Invalid email or password. Try test@example.com / Test123', 'error');
      return false;
    }
  };

  const handleSignup = (name, email, password) => {
    // Check if user already exists
    const userExists = dummyUsers.find(u => u.email === email);
    
    if (userExists) {
      showMessage('This email is already registered. Please login.', 'error');
      return false;
    }

    // Add new user to dummy database
    const newUser = { email, password, name };
    setDummyUsers([...dummyUsers, newUser]);
    showMessage('Account created successfully! Please sign in.', 'success');
    
    // Switch to login after 2 seconds
    setTimeout(() => {
      switchToLogin();
    }, 2000);
    
    return true;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentForm('login');
    showMessage('You have been logged out successfully.', 'success');
  };

  // If user is authenticated, show HomePage
  if (isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage user={currentUser} onLogout={handleLogout} />} />
          <Route path="/company/:companyId" element={<CompanyDetail user={currentUser} onLogout={handleLogout} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    );
  }

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
            <p className="text-gray-600"> {currentForm === 'login' ? "Welcome back! Please sign in to your account"
            : "Welcome! Please create an account below" }</p>
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
              onLogin={handleLogin}
            />
          ) : (
            <SignupForm 
              onSwitchToLogin={switchToLogin}
              onShowMessage={showMessage}
              onSignup={handleSignup}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
