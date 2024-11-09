import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom"; // Import NavLink
import Button from "./ui/Button";
import Typography from "./ui/Typography";

const Navbar: React.FC = () => {
  // State to toggle the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-dark p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-primary-200 text-2xl font-bold">
          WalletApp
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

          {/* New Newsfeed Link */}
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
        <div className="hidden md:flex space-x-4">
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

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-primary-500 focus:outline-none"
          >
            <span>☰</span> {/* Simple hamburger icon */}
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
            ✖ {/* Close icon */}
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
            to="/pricing"
            className={({ isActive }) =>
              isActive
                ? "text-primary-400 text-2xl transition"
                : "text-white text-2xl hover:text-primary-400 transition"
            }
            onClick={toggleMenu}
          >
            <Typography variant="h6">Pricing</Typography>
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

          {/* New Newsfeed Link in Mobile Menu */}
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
          <div className="space-y-6">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
