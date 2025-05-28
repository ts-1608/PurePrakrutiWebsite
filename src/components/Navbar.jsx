import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPhoneAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import pure from '../resource/pureprakrti.png';
import { AuthContext } from "../AuthContext";

export const Navbar = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const userName = user?.userName;
  const baseUsername = user?.baseUsername;
  const logout = authContext?.logout;
  const navigate = useNavigate();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Carbon Footprints', path: '/carbonfootprint' },
    { name: 'Contact Us', path: '/contactUs' },
  ];

  if (user) {
    navItems.splice(2, 0, { name: 'Dashboard', path: '/UserDashBoard' });
  }

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full bg-green-800 shadow-lg z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img className="h-12 w-auto" src={pure} alt="Pure Prakrti" />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-white hover:text-green-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            
            <a href="tel:+91-9661829944" className="flex items-center text-white hover:text-green-200 transition-colors duration-200">
              <FaPhoneAlt className="mr-2" />
              <span>+91-96618 29944</span>
            </a>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setModalOpen(!isModalOpen)}
                  className="flex items-center space-x-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
                >
                  <img
                    src="https://www.w3schools.com/w3images/avatar2.png"
                    alt="Profile"
                    className="h-8 w-8 rounded-full"
                  />
                  <span>{userName || baseUsername}</span>
                </button>

                {isModalOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2"
                  >
                    <button
                      onClick={() => {
                        logout();
                        setModalOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/signup')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-colors duration-200"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors duration-200"
                >
                  Log In
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
              <div className="w-6 h-px bg-white mb-1"></div>
              <div className="w-6 h-px bg-white mb-1"></div>
              <div className="w-6 h-px bg-white"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-green-900"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-white hover:bg-green-700 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <a
              href="tel:+91-9661829944"
              className="text-white hover:bg-green-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              <FaPhoneAlt className="inline mr-2" />
              +91-96618 29944
            </a>

            {user ? (
              <div className="px-3 py-2">
                <div className="flex items-center space-x-3 mb-2">
                  <img
                    src="https://www.w3schools.com/w3images/avatar2.png"
                    alt="Profile"
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-white">{userName || baseUsername}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-red-400 hover:bg-red-900 px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-3 py-2 space-y-2">
                <button
                  onClick={() => {
                    navigate('/signup');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    navigate('/login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-green-50"
                >
                  Log In
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};