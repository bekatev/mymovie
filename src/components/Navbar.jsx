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

  return (
    <div className="bg-primary flex justify-between items-center p-4 w-screen">
      <Link to="/home">
        <img src={Logo} className="w-20" alt="Logo" />
      </Link>

      <nav>
        <div className="md:hidden">
          <button className="flex flex-col space-y-2" onClick={toggleMenu}>
            <div
              className={`h-1 w-6 bg-black transform transition duration-500 ease-in-out ${
                isOpen ? "rotate-45 translate-y-2 translate-x-12" : ""
              }`}
            ></div>
            <div
              className={`h-1 w-6 bg-black transition duration-500 ease-in-out ${
                isOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`h-1 w-6 bg-black transform transition duration-500 ease-in-out ${
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
                className="block px-4 py-2 text-sm font-bold txt"
              >
                Home
              </Link>
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm font-bold txt"
              >
                Profile
              </Link>
              <button
                className="block px-4 py-2 text-sm font-bold txt"
                onClick={logout}
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row">
              <Link
                to="/home"
                className="block px-4 py-2 text-sm font-bold txt"
              >
                Home
              </Link>
              <Link
                to="/login"
                className="block px-4 py-2 text-sm font-bold txt"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 text-sm font-bold txt"
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
