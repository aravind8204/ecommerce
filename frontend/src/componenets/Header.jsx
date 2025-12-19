import React, { useState, useRef, useEffect } from "react";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  LogIn,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const Header = ({ cartCount, onCartClick }) => {
  const { isLoggedIn, logout, navigate } = useApp();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate("/signin");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">
              ShopHub
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="hover:text-blue-600">Home</a>
            <a href="/products" className="hover:text-blue-600">Products</a>
            <a href="/#about" className="hover:text-blue-600">About</a>
            <a href="/#contact" className="hover:text-blue-600">Contact</a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
              >
                <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  {isLoggedIn ? (
                    <User className="text-white w-5 h-5" />
                  ) : (
                    <LogIn className="text-white w-5 h-5" />
                  )}
                </div>
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  {isLoggedIn ? (
                    <>
                      <a
                        href="/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Profile
                      </a>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <a
                      href="/signin"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Sign In
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2"
            >
              {showMobileMenu ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {showMobileMenu && (
          <nav className="md:hidden mt-4 border-t pt-4 space-y-2">
            <a href="/" className="block">Home</a>
            <a href="/products" className="block">Products</a>
            <a href="/#about" className="block">About</a>
            <a href="/#contact" className="block">Contact</a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
