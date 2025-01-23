import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ProfileDropdownNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("walletToken");
    navigate("/");
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-dark-200 rounded-lg shadow-lg py-2 z-50 flex flex-col items-center justify-center">
      <Link
        to="/profile"
        className="block px-4 py-2 text-white hover:bg-dark-100 transition w-full text-center"
      >
        View Profile
      </Link>
      <button
        onClick={handleLogout}
        className="block w-full px-4 py-2 text-red-500 hover:bg-dark-100 transition text-center"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileDropdownNavbar;
