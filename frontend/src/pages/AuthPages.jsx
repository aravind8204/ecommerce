import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';

const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber:'',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      alert(`Login successful!\nEmail: ${formData.email}`);
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      alert(`Signup successful!\nName: ${formData.name}\nEmail: ${formData.email}`);
    }
    // Reset form
    setFormData({
      name: '',
      email: '',
      mobileNumber:'',
      password: '',
      confirmPassword: ''
    });
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      mobileNumber:'',
      password: '',
      confirmPassword: ''
    });
    setShowPassword(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
            <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">ShopHub</h1>
          <p className="text-white text-opacity-90 mt-2">
            {isLogin ? 'Welcome back!' : 'Create your account'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Toggle Tabs */}
          <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                isLogin
                  ? 'bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-md'
                  : 'text-gray-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                !isLogin
                  ? 'bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-md'
                  : 'text-gray-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Name Field (Signup Only) */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            {/* Mobile Number Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (Signup Only) */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>
              </div>
            )}

            {/* Remember Me & Forgot Password (Login Only) */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#forgot" className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                  Forgot Password?
                </a>
              </div>
            )}

            {/* Terms & Conditions (Signup Only) */}
            {!isLogin && (
              <label className="flex items-start space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  required
                />
                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="#terms" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#privacy" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Privacy Policy
                  </a>
                </span>
              </label>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transform transition flex items-center justify-center space-x-2"
            >
              <span>{isLogin ? 'Login' : 'Create Account'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm font-semibold text-gray-700">Google</span>
            </button>
            <button className="flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">Facebook</span>
            </button>
          </div>

          {/* Toggle Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={toggleAuthMode}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-white text-sm mt-6 opacity-80">
          © 2024 ShopHub. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthPages;