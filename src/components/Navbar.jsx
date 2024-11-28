import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useUser } from "../components/auth/UserContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="bg-primary flex justify-between items-center py-2 px-4 w-screen">
      <Link to="/home" onClick={closeMenu}>
        <img src={Logo} className="w-20" alt="Logo" />
      </Link>

      <nav>
        <div className="md:hidden">
          <button className="flex flex-col space-y-2" onClick={toggleMenu}>
            <div
              className={`h-1 w-6 bg-txt transform transition duration-500 ease-in-out ${
                isOpen ? "rotate-45 translate-y-2 translate-x-12" : ""
              }`}
            ></div>
            <div
              className={`h-1 w-6 bg-txt transition duration-500 ease-in-out ${
                isOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`h-1 w-6 bg-txt transform transition duration-500 ease-in-out ${
                isOpen ? "-rotate-45 -translate-y-4 translate-x-12" : ""
              }`}
            ></div>
          </button>
        </div>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex flex-col md:flex-row`}
        >
          {user ? (
            <div className="flex flex-col md:flex-row">
              <Link
                to="/home"
                className="block px-4 py-2 text-sm font-bold text-txt"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm font-bold text-txt"
                onClick={closeMenu}
              >
                Profile
              </Link>
              <button
                className="block px-4 py-2 text-sm font-bold text-txt"
                onClick={() => {
                  logout();
                  closeMenu();
                }}
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row">
              <Link
                to="/home"
                className="block px-4 py-2 text-sm font-bold text-txt"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                to="/login"
                className="block px-4 py-2 text-sm font-bold text-txt"
                onClick={closeMenu}
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 text-sm font-bold text-txt"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
