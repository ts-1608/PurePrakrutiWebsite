import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoReorderThreeOutline } from 'react-icons/io5';
import pure from '../resource/pureprakrti.png';
import { AuthContext } from "../AuthContext";

export const Navbar = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  // const userId = user?.userId;
  const userName = user?.userName;
  const baseUsername = user?.baseUsername;
  const logout = authContext?.logout;
  const navigate = useNavigate();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false); // Track modal state

  const toggleModal = () => {
    setModalOpen(!isModalOpen); // Toggle modal visibility
  };

  return (
    <div className="sticky top-0 z-50 w-screen shadow-md bg-green-800">
      <div className="flex items-center justify-between max-w-[1240px] mx-auto px-4 py-3">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={pure} alt="Pure Prakrti" className="h-12 w-auto" />
        </Link>
        <div className="hidden md:flex gap-4 lg:gap-6 text-sm sm:text-base items-center font-semibold text-white ml-auto mr-8">
          <Link to="/" className="hover:text-cyan-500 transition duration-300">Home</Link>
          <Link to="/carbonfootprint" className="hover:text-cyan-500 transition duration-300">Carbon Footprints</Link>
          {user && <Link to="/UserDashBoard" className="hover:text-cyan-500 transition duration-300">Dashboard</Link>}
          <Link to="/contactUs" className="hover:text-cyan-500 transition duration-300">Contact Us</Link>
        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-4 text-white ">
          <a href="tel:+91-9661829944" className="flex items-center text-lg hover:text-cyan-400 transition gap-2">
            <FaPhoneAlt />
            <span>Call +91-96618 29944</span>
          </a>
          {user ? (
            <div className="flex items-center gap-4 cursor-pointer" onClick={toggleModal}>
              <img
                src="https://www.w3schools.com/w3images/avatar2.png" // Replace with actual user logo image
                alt="User Logo"
                className="h-10 w-10 rounded-full"
              />
            </div>
          ) : (
            <>
              <button className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700" onClick={() => navigate('/signup')}>
                Sign Up
              </button>
              <button className="bg-white text-green-500 px-4 py-2 rounded-lg hover:bg-gray-200" onClick={() => navigate('/login')}>
                Log In
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          <IoReorderThreeOutline size={30} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-green-900 text-white flex flex-col items-center py-4 space-y-4">
          <Link to="/" className="hover:text-cyan-400" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/CarbonFootprint" className="hover:text-cyan-400" onClick={() => setMobileMenuOpen(false)}>Carbon Footprints</Link>
          {user && <Link to="/UserDashBoard" className="hover:text-cyan-400" onClick={() => setMobileMenuOpen(false)}>DashBoard</Link>}
          <Link to="/contactUs" className="hover:text-cyan-400" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
          <a href="tel:+91-9661829944" className="flex items-center gap-2 text-lg hover:text-cyan-400">
            <FaPhoneAlt />
            <span>Call +91-96618 29944</span>
          </a>
          {user ? (
            <div className="flex items-center gap-4 cursor-pointer" onClick={toggleModal}>
              <img
                src="https://www.w3schools.com/w3images/avatar2.png" // Replace with actual user logo image
                alt="User Logo"
                className="h-10 w-10 rounded-full"
              />
            </div>
          ) : (
            <>
              <button className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700" onClick={() => { navigate('/signup'); setMobileMenuOpen(false); }}>
                Sign Up
              </button>
              <button className="bg-white text-green-500 px-4 py-2 rounded-lg hover:bg-gray-200" onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}>
                Log In
              </button>
            </>
          )}
        </div>
      )}

      {/* Modal for User Details (Inside Navbar) */}
      {isModalOpen && (
        <div className="absolute top-20 right-8 bg-white p-6 rounded-lg shadow-lg w-72 z-50">
          <div className="flex items-center gap-4">
            <img
              src="https://www.w3schools.com/w3images/avatar2.png" // Replace with actual user logo image
              alt="User Logo"
              className="h-16 w-16 rounded-full"
            />
            <div className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
              <h3 className="text-m font-semibold">{userName ? userName : baseUsername}</h3>
            </div>
          </div>
          <div className="mt-4 flex justify-between gap-2">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 w-full"
              onClick={() => {
                logout(); // Call logout
                toggleModal(); // Close the modal after logout
              }}
            >
              Logout
            </button>
            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 w-full" onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
