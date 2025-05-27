import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoReorderThreeOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import pure from '../resource/pureprakrti.png';
import { AuthContext } from "../AuthContext";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export const Navbar = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const userName = user?.userName;
  const baseUsername = user?.baseUsername;
  const logout = authContext?.logout;
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/carbonfootprint', label: 'Carbon Footprints' },
    { path: '/UserDashBoard', label: 'Dashboard', requiresAuth: true },
    { path: '/contactUs', label: 'Contact Us' },
  ];

  const navbarVariants = {
    hidden: { y: -100 },
    visible: { 
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const menuVariants = {
    closed: { opacity: 0, x: '-100%' },
    open: { opacity: 1, x: 0 }
  };

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-green-800 shadow-lg' : 'bg-green-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0">
            <LazyLoadImage
              src={pure}
              alt="Pure Prakrti"
              className="h-12 w-auto"
              effect="blur"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              (!link.requiresAuth || user) && (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-white hover:text-cyan-400 transition-colors duration-300 ${
                    location.pathname === link.path ? 'border-b-2 border-cyan-400' : ''
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="tel:+91-9661829944" className="flex items-center text-white hover:text-cyan-400 transition-colors duration-300">
              <FaPhoneAlt className="mr-2" />
              <span>+91-96618 29944</span>
            </a>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setModalOpen(!isModalOpen)}
                  className="flex items-center space-x-2 text-white hover:text-cyan-400 transition-colors duration-300"
                >
                  <img
                    src="https://www.w3schools.com/w3images/avatar2.png"
                    alt="User"
                    className="h-8 w-8 rounded-full border-2 border-white"
                  />
                  <span>{userName || baseUsername}</span>
                </button>

                <AnimatePresence>
                  {isModalOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2"
                    >
                      <button
                        onClick={() => {
                          logout();
                          setModalOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="space-x-4">
                <button
                  onClick={() => navigate('/signup')}
                  className="btn-primary"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="btn-secondary"
                >
                  Log In
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
          >
            <IoReorderThreeOutline size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-green-900"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                (!link.requiresAuth || user) && (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block px-3 py-2 text-white hover:bg-green-700 rounded-md transition-colors duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              ))}
              
              <a
                href="tel:+91-9661829944"
                className="block px-3 py-2 text-white hover:bg-green-700 rounded-md transition-colors duration-300"
              >
                <FaPhoneAlt className="inline mr-2" />
                +91-96618 29944
              </a>

              {!user && (
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      navigate('/signup');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full btn-primary"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => {
                      navigate('/login');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full btn-secondary"
                  >
                    Log In
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};