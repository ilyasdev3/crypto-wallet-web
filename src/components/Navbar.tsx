import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "./ui/Button";
import Typography from "./ui/Typography";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/user/queries.user";
import ProfileDropdownNavbar from "./ProfileDropdownNavbar";
import { ensureHttps } from "../utils/imageUrlChecker";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const { loading, error, data } = useQuery(GET_USER);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <nav className="bg-dark p-4 shadow-md relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-primary-200 text-2xl font-bold">
          Coindex
        </Link>

        {/* Menu for larger screens */}
        <div className="hidden md:flex space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-primary-400 hover:text-primary-500 transition"
                : "text-primary-200 hover:text-primary-400 transition"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/features"
            className={({ isActive }) =>
              isActive
                ? "text-primary-400 hover:text-primary-500 transition"
                : "text-white hover:text-primary-400 transition"
            }
          >
            Features
          </NavLink>
          <NavLink
            to="/wallet"
            className={({ isActive }) =>
              isActive
                ? "text-primary-400 hover:text-primary-500 transition"
                : "text-white hover:text-primary-400 transition"
            }
          >
            Wallet
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-primary-400 hover:text-primary-500 transition"
                : "text-white hover:text-primary-400 transition"
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/newsfeed"
            className={({ isActive }) =>
              isActive
                ? "text-primary-400 hover:text-primary-500 transition"
                : "text-white hover:text-primary-400 transition"
            }
          >
            Newsfeed
          </NavLink>
        </div>

        {/* Auth Buttons for larger screens */}
        {data?.me?.id ? (
          <div className="hidden md:flex items-center space-x-4 relative">
            <button
              onClick={toggleProfileMenu}
              className="relative focus:outline-none"
            >
              <img
                src={
                  ensureHttps(data.me.profileImage) || "/api/placeholder/40/40"
                }
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-primary-500 hover:border-primary-400 transition-colors"
              />
              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && <ProfileDropdownNavbar />}
            </button>
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="text-white hover:text-primary-300 transition"
            >
              <Typography variant="body1">Log in</Typography>
            </Link>
            <Button
              to="/register"
              className="bg-primary-500 text-white px-4 py-2 rounded-lg shadow-glow hover:bg-primary-600 transition"
              variant="primary"
              size="medium"
            >
              Sign Up
            </Button>
          </div>
        )}

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          {data?.me?.id && (
            <img
              src={data.me.profileImage || "/api/placeholder/32/32"}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border-2 border-primary-500 mr-4"
            />
          )}
          <button
            onClick={toggleMenu}
            className="text-primary-500 focus:outline-none"
          >
            <span className="text-2xl">☰</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Full Screen */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden fixed inset-0 bg-dark-200 bg-opacity-90 z-50 p-8`}
      >
        <div className="flex justify-end mb-8">
          <button onClick={toggleMenu} className="text-primary-500 text-3xl">
            ✖
          </button>
        </div>

        <div className="flex flex-col space-y-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-primary-400 text-2xl transition"
                : "text-white text-2xl hover:text-primary-400 transition"
            }
            onClick={toggleMenu}
          >
            <Typography variant="h6">Home</Typography>
          </NavLink>
          <NavLink
            to="/features"
            className={({ isActive }) =>
              isActive
                ? "text-primary-400 text-2xl transition"
                : "text-white text-2xl hover:text-primary-400 transition"
            }
            onClick={toggleMenu}
          >
            <Typography variant="h6">Features</Typography>
          </NavLink>
          <NavLink
            to="/wallet"
            className={({ isActive }) =>
              isActive
                ? "text-primary-400 text-2xl transition"
                : "text-white text-2xl hover:text-primary-400 transition"
            }
            onClick={toggleMenu}
          >
            <Typography variant="h6">Wallet</Typography>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-primary-400 text-2xl transition"
                : "text-white text-2xl hover:text-primary-400 transition"
            }
            onClick={toggleMenu}
          >
            <Typography variant="h6">Contact</Typography>
          </NavLink>
          <NavLink
            to="/newsfeed"
            className={({ isActive }) =>
              isActive
                ? "text-primary-400 text-2xl transition"
                : "text-white text-2xl hover:text-primary-400 transition"
            }
            onClick={toggleMenu}
          >
            <Typography variant="h6">Newsfeed</Typography>
          </NavLink>

          {/* Auth Buttons for mobile */}
          {data?.me?.id ? (
            <div className="flex items-center justify-center flex-col space-y-6">
              <Link
                to="/profile"
                className="block text-white text-2xl hover:text-primary-300 transition"
                onClick={toggleMenu}
              >
                <Typography variant="h6">Profile</Typography>
              </Link>
              <button
                onClick={() => {
                  // Add logout logic here
                  console.log("Logout clicked");
                }}
                className="text-red-500 text-2xl hover:text-red-400 transition"
              >
                <Typography variant="h6">Logout</Typography>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center flex-col space-y-6">
              <Link
                to="/login"
                className="block text-white text-2xl hover:text-primary-300 transition"
                onClick={toggleMenu}
              >
                <Typography variant="h6">Log in</Typography>
              </Link>
              <Button
                to="/register"
                className="block bg-primary-500 text-white px-4 py-2 rounded-lg shadow-glow hover:bg-primary-600 transition"
                variant="primary"
                size="medium"
                onClick={toggleMenu}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
