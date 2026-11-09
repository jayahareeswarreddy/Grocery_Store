import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import ProfileModal from './ProfileModal';

function Navbar({ cartCount, onCartClick, user, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const categories = [
    { name: 'Home', path: '/' },
    { name: 'Fruits', path: '/category/Fruits' },
    { name: 'Vegetables', path: '/category/Vegetables' },
    { name: 'Dairy', path: '/category/Dairy' },
    { name: 'Bakery', path: '/category/Bakery' },
    { name: 'Snacks', path: '/category/Snacks' },
    { name: 'Beverages', path: '/category/Beverages' },
    { name: 'Household', path: '/category/Household' },
    { name: 'Personal Care', path: '/category/Personal-Care' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.includes(path)) return true;
    return false;
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-emerald-600">Grocery Store</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(category.path)
                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                    : 'text-gray-600 hover:text-emerald-600'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <button
              onClick={onCartClick}
              className="p-2 hover:bg-emerald-50 rounded-full transition-colors relative"
            >
              <ShoppingCartIcon className="h-6 w-6 text-emerald-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-emerald-600">
                    Welcome, {user.name}
                  </span>
                  <div className="flex items-center space-x-2">
                    {user.userType === 'admin' ? (
                      <Link
                        to="/admin-dashboard"
                        className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <button
                        onClick={() => setIsProfileOpen(true)}
                        className="p-2 hover:bg-emerald-50 rounded-full transition-colors"
                      >
                        <UserIcon className="h-6 w-6 text-emerald-600" />
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="text-sm font-medium text-gray-600 hover:text-emerald-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-gray-600 hover:text-emerald-600"
                  >
                    Login
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link
                    to="/signup"
                    className="text-sm font-medium text-gray-600 hover:text-emerald-600"
                  >
                    Signup
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button - You can add mobile menu functionality here */}
      <div className="lg:hidden">
        {/* Add mobile menu implementation if needed */}
      </div>

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
      />
    </nav>
  );
}

export default Navbar;
