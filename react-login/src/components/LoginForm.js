import React, { useState } from 'react';

const LoginForm = ({ onSwitchToSignup, onShowMessage }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Backend API endpoint
  const LOGIN_ENDPOINT = 'http://localhost:3000/api/auth/login';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(LOGIN_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Success - store token and redirect
        if (data.token) {
          localStorage.setItem('authToken', data.token);
          if (formData.rememberMe) {
            localStorage.setItem('rememberUser', 'true');
          }
        }
        
        onShowMessage('Login successful! Redirecting...', 'success');
        
        // Redirect after short delay
        setTimeout(() => {
          window.location.href = '/index.html'; // Change to your dashboard/home page
        }, 1500);
        
      } else {
        // Error from backend
        onShowMessage(data.message || 'Login failed. Please try again.', 'error');
      }

    } catch (error) {
      console.error('Login error:', error);
      onShowMessage('Network error. Please check your connection and try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">Sign In</h2>
      
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none ${
            errors.email 
              ? 'border-red-300 focus:border-red-500' 
              : 'border-gray-200 focus:border-primary-500'
          }`}
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none ${
            errors.password 
              ? 'border-red-300 focus:border-red-500' 
              : 'border-gray-200 focus:border-primary-500'
          }`}
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      {/* Form Options */}
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
        <a href="#" className="text-sm text-primary-600 hover:text-primary-700 transition-colors">
          Forgot password?
        </a>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full gradient-primary text-white py-3 px-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>

      {/* Switch to Signup */}
      <p className="text-center text-gray-600">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
        >
          Sign up
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
